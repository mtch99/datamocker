import fs from "fs"
import { AST as EstreeAST, AST_NODE_TYPES, parse } from "@typescript-eslint/typescript-estree"
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AST = EstreeAST<any>


const PARSE_DEFAULT_OPTIONS = {
	comment: false,
	filePath: "estree.ts", // or 'estree.tsx', if you pass jsx: true
	jsx: false,
	loc: false,
	loggerFn: undefined,
	range: false,
	tokens: false,
}


function readCodeFromFile(filePath: string): string {
	return fs.readFileSync(filePath).toString()
}

function parseCode(code: string, options = PARSE_DEFAULT_OPTIONS): AST {
	return parse(code, options)
}
  

// TODO: Remove unknown result type by creating an interface for TSTyapAliasDeclarationNode
function getAllTypeAliasDeclarations(filePath: string): unknown[]{
	const code = readCodeFromFile(filePath)
	const ast = parseCode(code)
	return ast.body.filter(node => node.type == AST_NODE_TYPES.TSTypeAliasDeclaration)
}


console.log(getAllTypeAliasDeclarations("./example.ts"))