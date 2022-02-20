const defaultLayout = Enum.KeyCode.GetEnumItems().map((x) => [x, x] as const);

function createLayout(layout: Array<readonly [Enum.KeyCode, Enum.KeyCode]>) {
	return new ReadonlyMap([
		...defaultLayout.filter(([x]) => !layout.some(([y]) => x === y)),
		...layout,
	]);
}

export enum LayoutKind {
	QWERTY,
	Dvorak,
	Colemak,
	Workman,
	AZERTY,
	QWERTZ,
}

const layouts: Record<LayoutKind, ReadonlyMap<Enum.KeyCode, Enum.KeyCode>> = {
	[LayoutKind.QWERTY]: new ReadonlyMap(defaultLayout),
	[LayoutKind.Dvorak]: createLayout([
		[Enum.KeyCode.Minus, Enum.KeyCode.LeftBracket],
		[Enum.KeyCode.Equals, Enum.KeyCode.RightBracket],
		[Enum.KeyCode.Q, Enum.KeyCode.Ampersand],
		[Enum.KeyCode.W, Enum.KeyCode.Comma],
		[Enum.KeyCode.E, Enum.KeyCode.Colon],
		[Enum.KeyCode.R, Enum.KeyCode.P],
		[Enum.KeyCode.T, Enum.KeyCode.Y],
		[Enum.KeyCode.Y, Enum.KeyCode.F],
		[Enum.KeyCode.U, Enum.KeyCode.G],
		[Enum.KeyCode.I, Enum.KeyCode.C],
		[Enum.KeyCode.O, Enum.KeyCode.R],
		[Enum.KeyCode.P, Enum.KeyCode.L],
		[Enum.KeyCode.LeftBracket, Enum.KeyCode.Slash],
		[Enum.KeyCode.RightBracket, Enum.KeyCode.Equals],
		[Enum.KeyCode.S, Enum.KeyCode.O],
		[Enum.KeyCode.D, Enum.KeyCode.E],
		[Enum.KeyCode.F, Enum.KeyCode.U],
		[Enum.KeyCode.G, Enum.KeyCode.I],
		[Enum.KeyCode.H, Enum.KeyCode.D],
		[Enum.KeyCode.J, Enum.KeyCode.H],
		[Enum.KeyCode.K, Enum.KeyCode.T],
		[Enum.KeyCode.L, Enum.KeyCode.N],
		[Enum.KeyCode.Semicolon, Enum.KeyCode.S],
		[Enum.KeyCode.Ampersand, Enum.KeyCode.Minus],
		[Enum.KeyCode.Z, Enum.KeyCode.Semicolon],
		[Enum.KeyCode.X, Enum.KeyCode.Q],
		[Enum.KeyCode.C, Enum.KeyCode.J],
		[Enum.KeyCode.V, Enum.KeyCode.K],
		[Enum.KeyCode.B, Enum.KeyCode.X],
		[Enum.KeyCode.N, Enum.KeyCode.B],
		[Enum.KeyCode.Comma, Enum.KeyCode.W],
		[Enum.KeyCode.Colon, Enum.KeyCode.V],
		[Enum.KeyCode.Slash, Enum.KeyCode.Z],
	]),
	[LayoutKind.Colemak]: createLayout([
		[Enum.KeyCode.E, Enum.KeyCode.F],
		[Enum.KeyCode.R, Enum.KeyCode.P],
		[Enum.KeyCode.T, Enum.KeyCode.G],
		[Enum.KeyCode.Y, Enum.KeyCode.J],
		[Enum.KeyCode.U, Enum.KeyCode.L],
		[Enum.KeyCode.I, Enum.KeyCode.U],
		[Enum.KeyCode.O, Enum.KeyCode.Y],
		[Enum.KeyCode.P, Enum.KeyCode.Semicolon],
		[Enum.KeyCode.S, Enum.KeyCode.R],
		[Enum.KeyCode.D, Enum.KeyCode.S],
		[Enum.KeyCode.F, Enum.KeyCode.T],
		[Enum.KeyCode.G, Enum.KeyCode.D],
		[Enum.KeyCode.J, Enum.KeyCode.N],
		[Enum.KeyCode.K, Enum.KeyCode.E],
		[Enum.KeyCode.L, Enum.KeyCode.I],
		[Enum.KeyCode.Semicolon, Enum.KeyCode.O],
		[Enum.KeyCode.N, Enum.KeyCode.K],
	]),
	[LayoutKind.Workman]: createLayout([
		[Enum.KeyCode.W, Enum.KeyCode.D],
		[Enum.KeyCode.E, Enum.KeyCode.R],
		[Enum.KeyCode.R, Enum.KeyCode.W],
		[Enum.KeyCode.T, Enum.KeyCode.B],
		[Enum.KeyCode.Y, Enum.KeyCode.J],
		[Enum.KeyCode.U, Enum.KeyCode.F],
		[Enum.KeyCode.I, Enum.KeyCode.U],
		[Enum.KeyCode.O, Enum.KeyCode.P],
		[Enum.KeyCode.P, Enum.KeyCode.Semicolon],
		[Enum.KeyCode.D, Enum.KeyCode.H],
		[Enum.KeyCode.F, Enum.KeyCode.T],
		[Enum.KeyCode.H, Enum.KeyCode.Y],
		[Enum.KeyCode.J, Enum.KeyCode.N],
		[Enum.KeyCode.K, Enum.KeyCode.E],
		[Enum.KeyCode.L, Enum.KeyCode.O],
		[Enum.KeyCode.Semicolon, Enum.KeyCode.I],
		[Enum.KeyCode.C, Enum.KeyCode.M],
		[Enum.KeyCode.V, Enum.KeyCode.C],
		[Enum.KeyCode.B, Enum.KeyCode.V],
		[Enum.KeyCode.N, Enum.KeyCode.K],
		[Enum.KeyCode.M, Enum.KeyCode.L],
	]),
	[LayoutKind.AZERTY]: createLayout([
		[Enum.KeyCode.Q, Enum.KeyCode.A],
		[Enum.KeyCode.W, Enum.KeyCode.Z],
		[Enum.KeyCode.A, Enum.KeyCode.Q],
		[Enum.KeyCode.Z, Enum.KeyCode.W],
	]),
	[LayoutKind.QWERTZ]: createLayout([
		[Enum.KeyCode.Y, Enum.KeyCode.Z],
		[Enum.KeyCode.Z, Enum.KeyCode.Y],
	]),
};

export function translateKeyCode(keyCode: Enum.KeyCode, layout: LayoutKind) {
	return layouts[layout].get(keyCode)!;
}