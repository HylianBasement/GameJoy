export { BaseAction } from "./Class/BaseAction";
export { Context } from "./Class/Context";

export * as Actions from "./Actions";

export * as TypeChecks from "./Util/TypeChecks";
export { withKeypadSupport } from "./Util/withKeypadSupport";
export { withModifierKeys } from "./Util/withModifierKeys";

export {
	ActionEntry,
	AxisActionEntry,
	ContextOptions,
	RawActionEntry,
	RawActionLike,
} from "./Definitions/Types";

export const VERSION = PKG_VERSION;
