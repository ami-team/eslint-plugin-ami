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

module.exports = {
	/*-----------------------------------------------------------------*/

	'rules': {
		'ami-global': require('./lib/rules/ami-global.js'),
		'ami-class': require('./lib/rules/ami-class.js')
	},

	/*-----------------------------------------------------------------*/

	'configs': {
		'default': {
			'parserOptions': {
				'ecmaVersion': 2017
			},
			'env': {
				'browser': true,
				'jquery': true,
				'node': true,
				'es6': true
			},
		
			'extends': 'eslint:recommended',
		
			'globals': {
				/*-----------------------------------------*/
				/* AMI                                     */
				/*-----------------------------------------*/

				'$AMIInterface': false,
				'$AMINamespace': false,
				'$AMIClass': false,

				'amiCommand': false,
				'amiWebApp': false,
				'amiLogin': false,

				'ami': false,

				/*-----------------------------------------*/
				/* 3RD-PARTY                               */
				/*-----------------------------------------*/

				'JSPath': false,

				'define': false,
				'modules': false,

				/*-----------------------------------------*/
			},

			'rules': {
				/*-----------------------------------------*/
				/* IGNORE                                  */
				/*-----------------------------------------*/

				'no-useless-escape': 0,
				'no-mixed-spaces-and-tabs': 0,

				/*-----------------------------------------*/
				/* WARNING                                 */
				/*-----------------------------------------*/

				'no-console': 1,

				'no-unused-vars': [
					1,
					{'vars': 'all', 'args': 'after-used'}
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
