/*!
 * AMI Web Framework
 * AMI linting rules for ESLint
 *
 * Copyright (c) 2014-XXXX The AMI Team / LPSC / IN2P3
 *
 * This file must be used under the terms of the CeCILL-C:
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-fr.html
 *
 */

'use strict';

/*--------------------------------------------------------------------------------------------------------------------*/

module.exports = function(context)
{
	var amiNamespaces = {};
	var amiInterfaces = {};
	var amiClasses = {};

  	var globalScope;

	return {
		/*------------------------------------------------------------------------------------------------------------*/

		'Program': function()
		{
			globalScope = context.getScope();
		},

		/*------------------------------------------------------------------------------------------------------------*/

		'CallExpression': function(node)
		{
			var i;

			var delList = [];

			/*-------------------------------------------------*/
			/* NAMESPACE                                       */
			/*-------------------------------------------------*/

			/**/ if(node.callee.name === '$AMINamespace')
			{
				if((node.arguments.length === 1 && node.arguments[0].type === 'Literal')
				   ||
				   (node.arguments.length === 2 && node.arguments[0].type === 'Literal' && node.arguments[1].type === 'ObjectExpression')
				 ) {
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

			/*-------------------------------------------------*/
			/* INTERFACE                                       */
			/*-------------------------------------------------*/

			else if(node.callee.name === '$AMIInterface')
			{
				if((node.arguments.length === 1 && node.arguments[0].type === 'Literal')
				   ||
				   (node.arguments.length === 2 && node.arguments[0].type === 'Literal' && node.arguments[1].type === 'ObjectExpression')
				 ) {
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

			/*-------------------------------------------------*/
			/* CLASSE                                          */
			/*-------------------------------------------------*/

			else if(node.callee.name === '$AMIClass')
			{
				if((node.arguments.length === 1 && node.arguments[0].type === 'Literal')
				   ||
				   (node.arguments.length === 2 && node.arguments[0].type === 'Literal' && node.arguments[1].type === 'ObjectExpression')
				 ) {
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

			/*--------------------------------------------------------------------------------------------------------*/

			for(i in delList)
			{
				delete globalScope.through[delList[i]];
			}

			/*--------------------------------------------------------------------------------------------------------*/
		},

		/*------------------------------------------------------------------------------------------------------------*/

		'NewExpression': function(node)
		{
			/*--------------------------------------------------------------------------------------------------------*/

			if(node.callee.name in amiClasses && node.parent.id)
			{
				context.markVariableAsUsed(node.parent.id.name);
			}

			/*--------------------------------------------------------------------------------------------------------*/
		}

		/*------------------------------------------------------------------------------------------------------------*/
	};
};

/*--------------------------------------------------------------------------------------------------------------------*/

module.exports.schema = [];

/*--------------------------------------------------------------------------------------------------------------------*/
