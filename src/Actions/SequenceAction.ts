import { Vec } from "@rbxts/rust-classes";

import { ActionConnection } from "../Util/ActionConnection";
import { ActionEntry, RawActionEntry } from "../Definitions/Types";
import { BaseAction } from "../Class/BaseAction";
import { Action } from "./Action";
import { UnionAction as Union } from "./UnionAction";

import { TransformAction } from "../Util/TransformAction";
import * as t from "../Util/TypeChecks";

export class SequenceAction<A extends RawActionEntry> extends BaseAction {
	private queue: Vec<A | ActionEntry<A> | Array<A | ActionEntry<A>>>;

	constructor(public readonly RawAction: Array<A | ActionEntry<A> | Array<A | ActionEntry<A>>>) {
		super();

		const rawActions = RawAction.filter(
			(action) => !t.isAction(action) || !t.ActionEntryIs(action, "OptionalAction"),
		);

		const queue = (this.queue = Vec.withCapacity(rawActions.size()));
		let canCancel = false;

		ActionConnection.From(this).Changed(() => {
			const size = queue.asPtr().size();

			if (
				size > 0 &&
				queue
					.iter()
					.enumerate()
					.all(([i, entry]) => RawAction[i] === entry)
			) {
				canCancel = true;

				if (size === rawActions.size()) {
					canCancel = false;
					return this.SetTriggered(true);
				}
			}

			if (this.IsPressed) this.SetTriggered((canCancel = false));
		});

		const conn = this.Connected.Connect(() => {
			conn.Disconnect();

			for (const entry of RawAction) {
				const action = TransformAction<A>(entry, Action, Union);
				const connection = ActionConnection.From(action);

				action.SetContext(this.Context);

				let began = false;

				connection.Triggered(() => {
					if (!t.ActionEntryIs(entry, "OptionalAction")) queue.push(entry);
					began = true;

					this.Changed.Fire();
				});

				connection.Released(() => {
					const index = queue.asPtr().findIndex((e) => e === entry);
					if (began && index >= 0) queue.remove(index);

					began = false;

					if (canCancel) {
						canCancel = false;
						this.Cancelled.Fire();
					}

					this.Changed.Fire();
				});
			}
		});
	}
}