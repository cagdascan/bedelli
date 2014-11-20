Package.describe({
	name: 'ian:accounts-ui-bootstrap-3',
	summary: 'Bootstrap-styled accounts-ui with multi-language support.',
	version: '1.1.23',
    name: 'accounts-ui-bootstrap-3'
})

Package.on_use(function (api) {
	api.use(['session@1.0.0',
		'handlebars@1.0.0',
		'stylus@1.0.0',
		'accounts-base@1.0.0',
		'underscore@1.0.0',
		'templating@1.0.0',
		'anti:i18n@0.4.3'
		],'client')

	api.add_files([
		'accounts_ui.js',

		// translations
		'i18n/en.i18n.js',
		'i18n/es.i18n.js',
		'i18n/ca.i18n.js',
		'i18n/fr.i18n.js',
		'i18n/de.i18n.js',
		'i18n/it.i18n.js',
		'i18n/pt.i18n.js',
		'i18n/ru.i18n.js',
		'i18n.js',

		'login_buttons.html',
		'login_buttons_single.html',
		'login_buttons_dropdown.html',
		'login_buttons_dialogs.html',

		'login_buttons_session.js',

		'login_buttons.js',
		'login_buttons_single.js',
		'login_buttons_dropdown.js',
		'login_buttons_dialogs.js',
		'accounts_ui.styl'
		], 'client')

	api.export('accountsUIBootstrap3', 'client')
})
