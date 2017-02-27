/*!
 * AMI Web Framework
 * AMI specific linting rules for ESLint
 *
 * Copyright (c) 2014-2017 The AMI Team
 * http://www.cecill.info/licences/Licence_CeCILL-C_V1-en.html
 *
 */

'use strict';

module.exports = {
	/*-----------------------------------------------------------------*/

	'rules': {
		'ami-global': require('./lib/rules/ami-global.js'),
		'ami-class': require('./lib/rules/ami-class.js')
	},

	/*-----------------------------------------------------------------*/

	'configs': {
		'default': {	
			'env': {
				'browser': true
			},
		
			'extends': 'eslint:recommended',
		
			'globals': {
				/*-----------------------------------------*/
				/* AMI                                     */
				/*-----------------------------------------*/

				'$AMIInterface': false,
				'$AMINamespace': false,
				'$AMIClass': false,

				'amiRegisterSubApp': false,

				'amiCommand': false,
				'amiWebApp': false,
				'amiLogin': false,

				'ami': false,

				/*-----------------------------------------*/
				/* 3RD-PARTY                               */
				/*-----------------------------------------*/

				'$': false,
				'jQuery': false,
				'JSPath': false

				/*-----------------------------------------*/
			},

			'rules': {
				/*-----------------------------------------*/
				/* IGNORE                                  */
				/*-----------------------------------------*/

				'no-mixed-spaces-and-tabs': 0,

				/*-----------------------------------------*/
				/* WARNING                                 */
				/*-----------------------------------------*/

				'no-console': 1,

				'no-unused-vars': [
					1,
					{'vars': 'local', 'args': 'after-used'}
				],

				/*-----------------------------------------*/
				/* ERROR                                   */
				/*-----------------------------------------*/

				'ami/ami-global': 2,
				'ami/ami-class': 2,

				'comma-dangle': [
					2,
					'only-multiline'
				],

				'quotes': [
					2,
					'single'
				]

				/*-----------------------------------------*/
			}
		}
	}

	/*-----------------------------------------------------------------*/
};
