(function() {

	// for convenience
	var loginButtonsSession = Accounts._loginButtonsSession;

	// events shared between loginButtonsLoggedOutDropdown and
	// loginButtonsLoggedInDropdown
	Template._loginButtons.events({
		'click input': function(event) {
			event.stopPropagation();
		},
		'click #login-name-link, click #login-sign-in-link': function(event) {
			event.stopPropagation();
			loginButtonsSession.set('dropdownVisible', true);
			Meteor.flush();
		},
		'click .login-close': function() {
			loginButtonsSession.closeDropdown();
		}
	});

	Template._loginButtons.toggleDropdown = function() {
		toggleDropdown();
	};

	//
	// loginButtonsLoggedInDropdown template and related
	//

	Template._loginButtonsLoggedInDropdown.events({
		'click #login-buttons-open-change-password': function(event) {
			event.stopPropagation();
			loginButtonsSession.resetMessages();
			loginButtonsSession.set('inChangePasswordFlow', true);
			Meteor.flush();
		}
	});

	Template._loginButtonsLoggedInDropdown.helpers({
		displayName: function() {
			return Accounts._loginButtons.displayName();
		},

		inChangePasswordFlow: function() {
			return loginButtonsSession.get('inChangePasswordFlow');
		},

		inMessageOnlyFlow: function() {
			return loginButtonsSession.get('inMessageOnlyFlow');
		},

		dropdownVisible: function() {
			return loginButtonsSession.get('dropdownVisible');
		}
	});


	Template._loginButtonsLoggedInDropdownActions.helpers({
		allowChangingPassword: function() {
			// it would be more correct to check whether the user has a password set,
			// but in order to do that we'd have to send more data down to the client,
			// and it'd be preferable not to send down the entire service.password document.
			//
			// instead we use the heuristic: if the user has a username or email set.
			var user = Meteor.user();
			return user.username || (user.emails && user.emails[0] && user.emails[0].address);
		},
		additionalLoggedInDropdownActions: function() {
			return Template._loginButtonsAdditionalLoggedInDropdownActions !== undefined;
		}
	});


	//
	// loginButtonsLoggedOutDropdown template and related
	//

	Template._loginButtonsLoggedOutDropdown.events({
		'click #login-buttons-password': function(event) {
			event.stopPropagation();
			loginOrSignup();
		},

		'keypress #forgot-password-email': function(event) {
			event.stopPropagation();
			if (event.keyCode === 13)
				forgotPassword();
		},

		'click #login-buttons-forgot-password': function(event) {
			event.stopPropagation();
			forgotPassword();
		},

		'click #signup-link': function(event) {
			event.stopPropagation();
			loginButtonsSession.resetMessages();

			// store values of fields before swtiching to the signup form
			var username = trimmedElementValueById('login-username');
			var email = trimmedElementValueById('login-email');
			var usernameOrEmail = trimmedElementValueById('login-username-or-email');
			// notably not trimmed. a password could (?) start or end with a space
			var password = elementValueById('login-password');

			loginButtonsSession.set('inSignupFlow', true);
			loginButtonsSession.set('inForgotPasswordFlow', false);

			// force the ui to update so that we have the approprate fields to fill in
			Meteor.flush();

			// update new fields with appropriate defaults
			if (username !== null)
				document.getElementById('login-username').value = username;
			else if (email !== null)
				document.getElementById('login-email').value = email;
			else if (usernameOrEmail !== null)
				if (usernameOrEmail.indexOf('@') === -1)
					document.getElementById('login-username').value = usernameOrEmail;
				else
					document.getElementById('login-email').value = usernameOrEmail;
		},
		'click #forgot-password-link': function(event) {
			event.stopPropagation();
			loginButtonsSession.resetMessages();

			// store values of fields before swtiching to the signup form
			var email = trimmedElementValueById('login-email');
			var usernameOrEmail = trimmedElementValueById('login-username-or-email');

			loginButtonsSession.set('inSignupFlow', false);
			loginButtonsSession.set('inForgotPasswordFlow', true);

			// force the ui to update so that we have the approprate fields to fill in
			Meteor.flush();
			//toggleDropdown();

			// update new fields with appropriate defaults
			if (email !== null)
				document.getElementById('forgot-password-email').value = email;
			else if (usernameOrEmail !== null)
				if (usernameOrEmail.indexOf('@') !== -1)
					document.getElementById('forgot-password-email').value = usernameOrEmail;
		},
		'click #back-to-login-link': function(event) {
			event.stopPropagation();
			loginButtonsSession.resetMessages();

			var username = trimmedElementValueById('login-username');
			var email = trimmedElementValueById('login-email') || trimmedElementValueById('forgot-password-email'); // Ughh. Standardize on names?

			loginButtonsSession.set('inSignupFlow', false);
			loginButtonsSession.set('inForgotPasswordFlow', false);

			// force the ui to update so that we have the approprate fields to fill in
			Meteor.flush();

			if (document.getElementById('login-username'))
				document.getElementById('login-username').value = username;
			if (document.getElementById('login-email'))
				document.getElementById('login-email').value = email;
			// "login-password" is preserved thanks to the preserve-inputs package
			if (document.getElementById('login-username-or-email'))
				document.getElementById('login-username-or-email').value = email || username;
		},
		'keypress #login-username, keypress #login-email, keypress #login-username-or-email, keypress #login-password, keypress #login-password-again': function(event) {
			if (event.keyCode === 13)
				loginOrSignup();
		}
	});


	Template._loginButtonsLoggedOutDropdown.helpers({
		// additional classes that can be helpful in styling the dropdown
		additionalClasses: function() {
			if (!Accounts.password) {
				return false;
			} else {
				if (loginButtonsSession.get('inSignupFlow')) {
					return 'login-form-create-account';
				} else if (loginButtonsSession.get('inForgotPasswordFlow')) {
					return 'login-form-forgot-password';
				} else {
					return 'login-form-sign-in';
				}
			}
		},

		dropdownVisible: function() {
			return loginButtonsSession.get('dropdownVisible');
		},

		hasPasswordService: function() {
			return Accounts._loginButtons.hasPasswordService();
		},

		forbidClientAccountCreation: function() {
			return Accounts._options.forbidClientAccountCreation;
		}
	});

	Template._loginButtonsLoggedOutAllServices.helpers({
		services: function() {
			return Accounts._loginButtons.getLoginServices();
		},

		isPasswordService: function() {
			return this.name === 'password';
		},

		hasOtherServices: function() {
			return Accounts._loginButtons.getLoginServices().length > 1;
		},

		hasPasswordService: function() {
			return Accounts._loginButtons.hasPasswordService();
		}
	});


	Template._loginButtonsLoggedOutPasswordService.helpers({
		fields: function() {
			var loginFields = [{
				fieldName: 'username-or-email',
				fieldLabel: i18n('loginFields.usernameOrEmail'),
				visible: function() {
					return _.contains(
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL"],
						Accounts.ui._passwordSignupFields());
				}
			}, {
				fieldName: 'username',
				fieldLabel: i18n('loginFields.username'),
				visible: function() {
					return Accounts.ui._passwordSignupFields() === "USERNAME_ONLY";
				}
			}, {
				fieldName: 'email',
				fieldLabel: i18n('loginFields.email'),
				inputType: 'email',
				visible: function() {
					return Accounts.ui._passwordSignupFields() === "EMAIL_ONLY";
				}
			}, {
				fieldName: 'password',
				fieldLabel: i18n('loginFields.password'),
				inputType: 'password',
				visible: function() {
					return true;
				}
			}];

			var signupFields = [{
				fieldName: 'username',
				fieldLabel: i18n('signupFields.username'),
				visible: function() {
					return _.contains(
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],
						Accounts.ui._passwordSignupFields());
				}
			}, {
				fieldName: 'email',
				fieldLabel: i18n('signupFields.email'),
				inputType: 'email',
				visible: function() {
					return _.contains(
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "EMAIL_ONLY"],
						Accounts.ui._passwordSignupFields());
				}
			}, {
				fieldName: 'email',
				fieldLabel: i18n('signupFields.emailOpt'),
				inputType: 'email',
				visible: function() {
					return Accounts.ui._passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL";
				}
			}, {
				fieldName: 'password',
				fieldLabel: i18n('signupFields.password'),
				inputType: 'password',
				visible: function() {
					return true;
				}
			}, {
				fieldName: 'password-again',
				fieldLabel: i18n('signupFields.passwordAgain'),
				inputType: 'password',
				visible: function() {
					// No need to make users double-enter their password if
					// they'll necessarily have an email set, since they can use
					// the "forgot password" flow.
					return _.contains(
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],
						Accounts.ui._passwordSignupFields());
				}
			},
			{
				fieldName: 'name',
				fieldLabel: 'Name',
				visible: true
			},
			{
				fieldName: 'surname',
				fieldLabel: 'Surname',
				visible: true
			},
			{
				fieldName: 'birthdate',
				fieldLabel: 'Birthdate',
				visible: true
			},
		];

			signupFields = Accounts.ui._options.extraSignupFields.concat(signupFields);

			return loginButtonsSession.get('inSignupFlow') ? signupFields : loginFields;
		},

		inForgotPasswordFlow: function() {
			return loginButtonsSession.get('inForgotPasswordFlow');
		},

		inLoginFlow: function() {
			return !loginButtonsSession.get('inSignupFlow') && !loginButtonsSession.get('inForgotPasswordFlow');
		},

		inSignupFlow: function() {
			return loginButtonsSession.get('inSignupFlow');
		},

		showForgotPasswordLink: function() {
			return _.contains(
				["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "EMAIL_ONLY"],
				Accounts.ui._passwordSignupFields());
		},

		showCreateAccountLink: function() {
			return !Accounts._options.forbidClientAccountCreation;
		}
	});

	Template._loginButtonsFormField.helpers({
		inputType: function() {
			return this.inputType || "text";
		}
	});

	//
	// loginButtonsChangePassword template
	//
	Template._loginButtonsChangePassword.events({
		'keypress #login-old-password, keypress #login-password, keypress #login-password-again': function(event) {
			if (event.keyCode === 13)
				changePassword();
		},
		'click #login-buttons-do-change-password': function(event) {
			event.stopPropagation();
			changePassword();
		},
		'click #login-buttons-cancel-change-password': function(event) {
			event.stopPropagation();
			loginButtonsSession.resetMessages();
			Accounts._loginButtonsSession.set('inChangePasswordFlow', false);
			Meteor.flush();
		}
	});

	Template._loginButtonsChangePassword.helpers({
		fields: function() {
			return [{
				fieldName: 'old-password',
				fieldLabel: i18n('changePasswordFields.currentPassword'),
				inputType: 'password',
				visible: function() {
					return true;
				}
			}, {
				fieldName: 'password',
				fieldLabel: i18n('changePasswordFields.newPassword'),
				inputType: 'password',
				visible: function() {
					return true;
				}
			}, {
				fieldName: 'password-again',
				fieldLabel: i18n('changePasswordFields.newPasswordAgain'),
				inputType: 'password',
				visible: function() {
					// No need to make users double-enter their password if
					// they'll necessarily have an email set, since they can use
					// the "forgot password" flow.
					return _.contains(
						["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],
						Accounts.ui._passwordSignupFields());
				}
			}];
		}
	});

	//
	// helpers
	//

	var elementValueById = function(id) {
		var element = document.getElementById(id);
		if (!element)
			return null;
		else
			return element.value;
	};

	var trimmedElementValueById = function(id) {
		var element = document.getElementById(id);
		if (!element)
			return null;
		else
			return element.value.replace(/^\s*|\s*$/g, ""); // trim;
	};

	var loginOrSignup = function() {
		if (loginButtonsSession.get('inSignupFlow'))
			signup();
		else
			login();
	};

	var login = function() {
		loginButtonsSession.resetMessages();

		var username = trimmedElementValueById('login-username');
		var email = trimmedElementValueById('login-email');
		var usernameOrEmail = trimmedElementValueById('login-username-or-email');
		// notably not trimmed. a password could (?) start or end with a space
		var password = elementValueById('login-password');

		var loginSelector;
		if (username !== null) {
			if (!Accounts._loginButtons.validateUsername(username))
				return;
			else
				loginSelector = {
					username: username
				};
		} else if (email !== null) {
			if (!Accounts._loginButtons.validateEmail(email))
				return;
			else
				loginSelector = {
					email: email
				};
		} else if (usernameOrEmail !== null) {
			// XXX not sure how we should validate this. but this seems good enough (for now),
			// since an email must have at least 3 characters anyways
			if (!Accounts._loginButtons.validateUsername(usernameOrEmail))
				return;
			else
				loginSelector = usernameOrEmail;
		} else {
			throw new Error("Unexpected -- no element to use as a login user selector");
		}

		Meteor.loginWithPassword(loginSelector, password, function(error, result) {
			if (error) {
				loginButtonsSession.errorMessage(error.reason || "Unknown error");
			} else {
				loginButtonsSession.closeDropdown();
			}
		});
	};

	var toggleDropdown = function() {
		// $('#login-dropdown-list .dropdown-menu').dropdown('toggle');
		$("#login-dropdown-list").toggleClass("open");

	};

	var signup = function() {
		loginButtonsSession.resetMessages();

		var options = {}; // to be passed to Accounts.createUser

		var username = trimmedElementValueById('login-username');
		if (username !== null) {
			if (!Accounts._loginButtons.validateUsername(username))
				return;
			else
				options.username = username;
		}

		var email = trimmedElementValueById('login-email');
		if (email !== null) {
			if (!Accounts._loginButtons.validateEmail(email))
				return;
			else
				options.email = email;
		}

		// notably not trimmed. a password could (?) start or end with a space
		var password = elementValueById('login-password');
		if (!Accounts._loginButtons.validatePassword(password))
			return;
		else
			options.password = password;

		if (!matchPasswordAgainIfPresent())
			return;

		// prepare the profile object
		options.profile = {};

		// define a proxy function to allow extraSignupFields set error messages
		var errorFn = function(errorMessage) {
			Accounts._loginButtonsSession.errorMessage(errorMessage);
		};

		var invalidExtraSignupFields = false;

		// parse extraSignupFields to populate account's profile data
		_.each(Accounts.ui._options.extraSignupFields, function(field, index) {
			var value = elementValueById('login-' + field.fieldName);
			if (typeof field.validate === 'function') {
				if (field.validate(value, errorFn)) {
					options.profile[field.fieldName] = elementValueById('login-' + field.fieldName);
				} else {
					invalidExtraSignupFields = true;
				}
			} else {
				options.profile[field.fieldName] = elementValueById('login-' + field.fieldName);
			}
		});

		if (invalidExtraSignupFields)
			return;

		Accounts.createUser(options, function(error) {
			if (error) {
				loginButtonsSession.errorMessage(error.reason || "Unknown error");
			} else {
				loginButtonsSession.closeDropdown();
			}
		});
	};

	var forgotPassword = function() {
		loginButtonsSession.resetMessages();

		var email = trimmedElementValueById("forgot-password-email");
		if (email.indexOf('@') !== -1) {
			Accounts.forgotPassword({
				email: email
			}, function(error) {
				if (error)
					loginButtonsSession.errorMessage(error.reason || "Unknown error");
				else
					loginButtonsSession.infoMessage(i18n('forgotPasswordForm.sent'));
			});
		} else {
			loginButtonsSession.infoMessage(i18n('forgotPasswordForm.sent'));
		}
	};

	var changePassword = function() {
		loginButtonsSession.resetMessages();

		// notably not trimmed. a password could (?) start or end with a space
		var oldPassword = elementValueById('login-old-password');

		// notably not trimmed. a password could (?) start or end with a space
		var password = elementValueById('login-password');
		if (!Accounts._loginButtons.validatePassword(password))
			return;

		if (!matchPasswordAgainIfPresent())
			return;

		Accounts.changePassword(oldPassword, password, function(error) {
			if (error) {
				loginButtonsSession.errorMessage(error.reason || "Unknown error");
			} else {
				loginButtonsSession.infoMessage("Password changed");

				// wait 3 seconds, then expire the msg
				Meteor.setTimeout(function() {
					loginButtonsSession.resetMessages();
				}, 3000);
			}
		});
	};

	var matchPasswordAgainIfPresent = function() {
		// notably not trimmed. a password could (?) start or end with a space
		var passwordAgain = elementValueById('login-password-again');
		if (passwordAgain !== null) {
			// notably not trimmed. a password could (?) start or end with a space
			var password = elementValueById('login-password');
			if (password !== passwordAgain) {
				loginButtonsSession.errorMessage(i18n('errorMessages.passwordsDontMatch'));
				return false;
			}
		}
		return true;
	};
})();