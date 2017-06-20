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
	return {
		/*---------------------------------------------------------*/

		'Program': function()
		{
			/*-------------------------------------------------*/

			var scope = context.getScope();

			var comments = context.getSourceCode()
			                      .getAllComments()
			;

			/*-------------------------------------------------*/

			if(comments.length > 0)
			{
				var i;
				var j;

				/*-----------------------------------------*/

				var regExp = /@global\s+([_a-zA-Z][_a-zA-Z0-9]*(\s*,\s*[_a-zA-Z][_a-zA-Z0-9]*)*)/g;

				/*-----------------------------------------*/

				var m;

                var id;

				var delList = [];

				while((m = regExp.exec(comments[0].value)))
				{
					var identifierList = m[1].split(/[\s,]+/);

					for(i in identifierList)
					{
						for(j in scope.through)
						{
                            id = scope.through[j].identifier.name;

							if(id === identifierList[i])
							{
								delList.push(j);
							}
						}
					}
				}

				/*-----------------------------------------*/

				for(j in scope.through)
				{
                    id = scope.through[j].identifier.name;

					if(id === 'require'
					   ||
					   id === 'exports'
					   ||
					   id === 'module'
					   ||
					   id === 'modules'
					 ) {
						delList.push(j);
					}
				}

				/*-----------------------------------------*/

				for(i in delList)
				{
					delete scope.through[delList[i]];
				}

				/*-----------------------------------------*/
			}

			/*-------------------------------------------------*/
		},

		/*---------------------------------------------------------*/
	};
};

/*-------------------------------------------------------------------------*/

module.exports.schema = [];

/*-------------------------------------------------------------------------*/
