meteor-accounts-ui-bootstrap-3
=====================================

Meteor accounts-ui styled with Twitter's Bootstrap 3, now with multi-language support.

Installation
-------------

With Meteor 0.9:

```sh
$ meteor add mizzao:bootstrap-3
$ meteor add ian:accounts-ui-bootstrap-3
```

You will also need at least one accounts plugin: `meteor add accounts-password`, `meteor add accounts-github`, etc.

How to use
-------------

Add `{{> loginButtons}}` to your template

Example:

```html
<div class="navbar navbar-default" role="navigation">
	<div class="navbar-header">
		<a class="navbar-brand" href="#">Project name</a>
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
	</div>
	<div class="navbar-collapse collapse">
		<ul class="nav navbar-nav">
			<li class="active"><a href="#">Link</a></li>
		</ul>
		<ul class="nav navbar-nav navbar-right">
			{{> loginButtons}} <!-- here -->
		</ul>
	</div>
</div>
```

You can also configure `Accounts.ui` to your liking as you would [with the official `accounts-ui`](https://docs.meteor.com/#/full/accounts_ui_config) package.

Add additional logged in actions
--------------------------------

You can add additional markup to the logged in dropdown, e.g. to edit
the user's account or profile, by defining a 
`_loginButtonsAdditionalLoggedInDropdownActions` template and specifying
the corresponding events.

```html
<template name="_loginButtonsAdditionalLoggedInDropdownActions">
	<button class="btn btn-default btn-block" id="login-buttons-edit-profile">Edit profile</button>
</template>
```

```javascript
Template._loginButtonsLoggedInDropdown.events({
	'click #login-buttons-edit-profile': function(event) {
		Router.go('profileEdit');
	}
});
```

Note that the dropdown will close since we're not stopping the propagation of the click event.

Localization
-------------

The default language is English, but this package also comes with translations to many other languages built in. If you want to change the language run one of the following on the client:

```javascript
accountsUIBootstrap3.setLanguage('es'); // for Spanish
accountsUIBootstrap3.setLanguage('ca'); // for Catalan
accountsUIBootstrap3.setLanguage('fr'); // for French
accountsUIBootstrap3.setLanguage('de'); // for German
accountsUIBootstrap3.setLanguage('it'); // for Italian
accountsUIBootstrap3.setLanguage('pt'); // for Portuguese
accountsUIBootstrap3.setLanguage('ru'); // for Russian
```

If you want to implement your own language, use the `map` function like so:

```javascript
accountsUIBootstrap3.map('es', {
    _resetPasswordDialog: {
      title: 'Restablece tu contraseña',
      cancel: 'Cancelar',
      submit: 'Guardar'
    },
    _enrollAccountDialog: {
      title: 'Escribe una contraseña',
      cancel: 'Cerrar',
      submit: 'Guardar contraseña'
    },
    // ...
})
```

You can use the translation files in the `i18n` folder as an example.


Screenshots
-------------

![Sign In](http://i.imgur.com/SGLZkOE.png)
![Sign Up](http://i.imgur.com/7S3C18J.png)
![Configure Login Service](http://i.imgur.com/Noa7sSm.png)
