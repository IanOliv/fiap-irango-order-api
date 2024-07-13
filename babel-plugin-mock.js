/**
 *
 * @param {import('@babel/core')} babel
 * @returns
 */
module.exports = function plugin(babel) {
    const { types: t } = babel;
    return {
      visitor: {
        CallExpression(path) {
          if (
            path.node?.callee?.property?.name === "mock" &&
            path.node?.callee?.object?.callee?.name === "_getJestObj"
          ) {
            if (path.node.arguments[0].type === "StringLiteral") {
              path.node.arguments[0] = t.callExpression(
                t.memberExpression(
                  t.identifier("require"),
                  t.identifier("resolve")
                ),
                [t.stringLiteral(path.node.arguments[0].value)]
              );
            }
          }
        },
      },
    };
  }
