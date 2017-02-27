/*!
 * AMI Web Framework
 * AMI linting rules for ESLint
 *
 * Copyright (c) 2014-2017 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

'use strict';

/*-------------------------------------------------------------------------*/

module.exports = function(context)
{
	var amiNamespaces = {};
	var amiInterfaces = {};
	var amiClasses = {};

  	var globalScope;

	return {
		/*---------------------------------------------------------*/

		'Program': function()
		{
			globalScope = context.getScope();
		},

		/*---------------------------------------------------------*/

		'CallExpression': function(node)
		{
			var i;

			/*-------------------------------------------------*/

			var delList = [];

			/**/ if(node.callee.name === '$AMINamespace')
			{
				if(node.arguments.length === 2 && node.arguments[0].type === 'Literal' && node.arguments[1].type === 'ObjectExpression')
				{
					for(i in globalScope.through)
					{
						if(globalScope.through[i].identifier.name === node.arguments[0].value)
						{
							amiNamespaces[globalScope.through[i].identifier.name] = globalScope.through[i];

							delList.push(i);
						}
					}
				}
				else
				{
					context.report({
						node: node,
						message: 'Syntax error for $AMINamespace'
					});
				}
			}
			else if(node.callee.name === '$AMIInterface')
			{
				if(node.arguments.length === 2 && node.arguments[0].type === 'Literal' && node.arguments[1].type === 'ObjectExpression')
				{
					for(i in globalScope.through)
					{
						if(globalScope.through[i].identifier.name === node.arguments[0].value)
						{
							amiInterfaces[globalScope.through[i].identifier.name] = globalScope.through[i];

							delList.push(i);
						}
					}
				}
				else
				{
					context.report({
						node: node,
						message: 'Syntax error for $AMIInterface'
					});
				}
			}
			else if(node.callee.name === '$AMIClass')
			{
				if(node.arguments.length === 2 && node.arguments[0].type === 'Literal' && node.arguments[1].type === 'ObjectExpression')
				{
					for(i in globalScope.through)
					{
						if(globalScope.through[i].identifier.name === node.arguments[0].value)
						{
							amiClasses[globalScope.through[i].identifier.name] = globalScope.through[i];

							delList.push(i);
						}
					}
				}
				else
				{
					context.report({
						node: node,
						message: 'Syntax error for $AMIClass'
					});
				}
			}

			/*-------------------------------------------------*/

			for(i in delList)
			{
				delete globalScope.through[delList[i]];
			}

			/*-------------------------------------------------*/
		},

		/*---------------------------------------------------------*/

		'NewExpression': function(node)
		{
			var i;

			/*-------------------------------------------------*/

			var delList = [];

			if(node.callee.name in amiClasses)
			{
				for(i in globalScope.through)
				{
					if(globalScope.through[i].identifier.name === node.parent.left.name)
					{
						delList.push(i);
					}
				}
			}

			/*-------------------------------------------------*/

			for(i in delList)
			{
				delete globalScope.through[delList[i]];
			}

			/*-------------------------------------------------*/
		}

		/*---------------------------------------------------------*/
	};
};

/*-------------------------------------------------------------------------*/

module.exports.schema = [];

/*-------------------------------------------------------------------------*/
