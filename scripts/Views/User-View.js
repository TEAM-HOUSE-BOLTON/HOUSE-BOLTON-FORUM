﻿'use strict';

var UserView = (function () {
    function registerView() {
        function reg() {
            try {
                UserController.registerUser($('#userNameInput').val(), $('#emailInput').val(), $('#password1Input').val(), $('#password2Input').val())
                .success(function () {
                    notyTopCenter('success', 'Successfully registered!', 3);
                })
                .error(function (error) {
                    notyInCustomContainer($('#registerSection'), 'bottomCenter', 'warning', JSON.parse(error.responseText).error, 3);
                });

            } catch (ex) {
                notyInCustomContainer($('#registerSection'), 'bottomCenter', 'warning', ex.message, 3);
            }
        }
        
        var parentContainer = $('main');
        parentContainer.children().remove();
        var existingRegisterContainer = $('#registerSection');
        if (existingRegisterContainer.length == 0) {
            var registerContainer = $('<article>')
                .attr('id', 'registerSection')
                .attr('class', 'small-question');
            
            $('<h2>')
                .text('Registration:')
                .attr('id', 'registerLabel')
                .appendTo(registerContainer);
            $('<input>')
                .attr('id', 'userNameInput')
                .attr('type', 'text')
                .attr('placeholder', 'username...')
                .attr('value', '')
                .appendTo(registerContainer);
            $('<input>')
                .attr('id', 'emailInput')
                .attr('type', 'email')
                .attr('placeholder', 'email...')
                .attr('value', '')
                .appendTo(registerContainer);
            $('<input>')
                .attr('id', 'password1Input')
                .attr('type', 'password')
                .attr('placeholder', 'password...')
                .attr('value', '')
                .appendTo(registerContainer);
            $('<input>')
                .attr('id', 'password2Input')
                .attr('type', 'password')
                .attr('placeholder', 'password again..')
                .attr('value', '')
                .appendTo(registerContainer);
            $('<input>')
                .attr('id', 'registerButton')
                .attr('type', 'button')
                .attr('value', 'Register')
                .appendTo(registerContainer)
                .click('click', reg);
            
            registerContainer.appendTo(parentContainer);
        }
    }
    
    function removeRegisterView() {
        var existingRegisterContainer = $('#registerSection');
        if (existingRegisterContainer.length !== 0) {
            existingRegisterContainer.remove();
        }
    }
    
    function loginView() {
        function login() {
            try {
                UserController.loginUser($('#userNameLoginInput').val(), $('#passwordLoginInput').val()).success(function () {
                    notyTopCenter('success', 'Successfully logged-in!', 3);
                }).error(function () {
                    notyInCustomContainer($('#loginSection'), 'bottomCenter', 'warning', 'Invalid username or password.', 3);
                });

            } catch (ex) {
                notyInCustomContainer($('#loginSection'), 'bottomCenter', 'warning', ex.message, 3);
            }
        }
        
        var parentContainer = $('main');
        parentContainer.children().remove();
        
        var existingLoginContainer = $('#loginSection');
        if (existingLoginContainer.length == 0) {
            var loginContainer = $('<article>')
                .attr('id', 'loginSection')
                .attr('class', 'small-question');
            
            $('<h2>')
                .text('Login:')
                .attr('id', 'loginLabel')
                .appendTo(loginContainer);
            $('<input>')
                .attr('id', 'userNameLoginInput')
                .attr('type', 'text')
                .attr('placeholder', 'username...')
                .attr('value', '')
                .appendTo(loginContainer);
            $('<input>')
                .attr('id', 'passwordLoginInput')
                .attr('type', 'password')
                .attr('placeholder', 'password...')
                .attr('value', '')
                .appendTo(loginContainer);
            $('<input>')
                .attr('id', 'loginButton')
                .attr('type', 'button')
                .attr('value', 'Login')
                .appendTo(loginContainer)
                .click('click', login);
            $('<label>')
                .text('')
                .attr('id', 'loginMessageLabel')
                .appendTo(loginContainer);
            
            loginContainer.appendTo(parentContainer);
        }
    }
    
    function removeLoginView() {
        var existingLoginContainer = $('#loginSection');
        if (existingLoginContainer.length !== 0) {
            existingLoginContainer.remove();
        }
    }
    
    function logoutView() {
        notyTopCenter('success', 'Successfully loggout!', 3);
    }
    
    function userProfileView(user, isYours) {
        var parentContainer = $('body main');
        parentContainer.children().remove();
        
        var existingUserProfileContainer = $('#userProfileSection');
        existingUserProfileContainer.remove();
        
        var userProfileContainer = $('<article>')
            .attr('id', 'userProfileSection')
            .attr('class', 'small-question');
        
        
        $('<h2>')
                .text(user.username + ' profile:')
                .attr('id', 'userProfileSectionHeading')
                .appendTo(userProfileContainer);
        
        var profileImageContainer = $('<div>')
                .attr('id', 'profileImageContainer')
                .appendTo(userProfileContainer);
        
        var avatarImg = $('<img>')
                .attr('id', 'profileImage')
                .attr('alt', user.username)
                .appendTo(profileImageContainer);
        
        var changeTag = 'label';
        if (isYours) {
            changeTag = 'input';
        }
        
        var profileInfoContainer = $('<div>')
                .attr('id', 'profileInfoContainer')
                .appendTo(userProfileContainer);
        
        $('<h4>')
                .attr('id', 'personalInfoHeading')
                .text('Personal info:')
                .appendTo(profileInfoContainer);
        $('<label>')
                .text('Username:')
                .attr('id', 'userNameProfileLabel')
                .appendTo(profileInfoContainer);
        $('<' + changeTag + '>')
                .attr('id', 'userNameProfileInput')
                .text(user.username)
                .attr('type', 'text')
                .attr('placeholder', 'username...')
                .attr('value', user.username)
                .appendTo(profileInfoContainer);
        $('<label>')
                .text('Email:')
                .attr('id', 'emailProfileLabel')
                .appendTo(profileInfoContainer);
        $('<' + changeTag + '>')
                .attr('id', 'emailProfileInput')
                .text(user.email)
                .attr('type', 'email')
                .attr('placeholder', 'email...')
                .attr('value', user.email)
                .appendTo(profileInfoContainer);
        
        if (isYours || user.city) {
            $('<label>')
                .text('City:')
                .attr('id', 'cityProfileLabel')
                .appendTo(profileInfoContainer);
            $('<' + changeTag + '>')
                .attr('id', 'cityProfileInput')
                .text(user.city)
                .attr('type', 'text')
                .attr('placeholder', 'city...')
                .attr('value', user.city)
                .appendTo(profileInfoContainer);
        }
        
        if (isYours || user.isMale != undefined || user.isMale != null) {
            $('<label>')
                .text('Gender:')
                .attr('id', 'genderProfileLabel')
                .appendTo(profileInfoContainer);
            
            if (isYours) {
                var isMaleSelect = $('<select>').attr('id', 'isMaleGenderSelect');
                var maleOption = $('<option>').attr('value', true).text('Male').appendTo(isMaleSelect);
                var femaleOption = $('<option>').attr('value', false).text('Female').appendTo(isMaleSelect);
                if (user.isMale == undefined || user.isMale == null) {
                    isMaleSelect.prop('selectedIndex', 0);
                } else {
                    if (user.isMale) {
                        maleOption.attr('selected', true);
                    } else {
                        femaleOption.attr('selected', true);
                    }
                }
                
                isMaleSelect.appendTo(profileInfoContainer);
            } else {
                $('<label>')
                .attr('id', 'isMaleProfileLabel')
                .text(user.isMale?'Male':'Female')
                .appendTo(profileInfoContainer);
            }
        }
        
        
        if (!user.avatar) {
            console.log('Missing avatar');
            // default Avatar is set on registration, but if something happened, and there is no avatar, default will be loaded again.
            UserController.getDefaultUser().success(function (data) {
                avatarImg.attr('src', data.defaultAvatar.url);
            }).error(function () {
                notyTopCenter('error', 'Cannot load (default) user avatar.', 3);
                throw Error('Cannot load (default) user avatar.');
            });
        } else {
            avatarImg.attr('src', user.avatar.url);
        }
        
        if (isYours) {
            $('<input>')
                .attr('id', 'userProfileChangeAvatarButton')
                .attr('type', 'file')
                .attr('value', 'Change avatar')
                .attr('accept', 'image/*')
                .click(user, changeAvatar)
                .appendTo(profileImageContainer);
            
            $('<input>')
                .attr('id', 'confirmPass')
                .attr('type', 'password')
                .attr('placeholder', 'confirm password...')
                .attr('required', 'required')
                .appendTo(userProfileContainer);
            
            $('<input>')
                .attr('id', 'saveChangesButton')
                .attr('type', 'button')
                .attr('value', 'Save')
                .appendTo(userProfileContainer)
                .click('click', saveChanges);
        }
        
        userProfileContainer.appendTo(parentContainer);
        
        function changeAvatar() {
            var file;
            // Set an event listener on the Choose File field.
            $('#userProfileChangeAvatarButton').bind("change", function (e) {
                var files = e.target.files || e.dataTransfer.files;
                // Our file var now holds the selected file
                file = files[0];
                UserController.uploadFile(file)
                .success(function (upploadedFile) {
                    $('#profileImage').attr('src', upploadedFile.url).attr('alt', user.username).attr('data-filename', JSON.stringify(upploadedFile));
                })
                .error(function () {
                    notyTopCenter('error', 'Cannot load that image.', 3);
                });
            });
        }
        
        function saveChanges() {
            var avatarFile = $('#profileImage').attr('data-filename');
            var newUserName = $('#userNameProfileInput').val();
            var newEmail = $('#emailProfileInput').val();
            var oldPass = $('#confirmPass').val();

            try {
                var newCity = $('#cityProfileInput').val();
                if (!newCity) {
                    newCity = null;
                }
                
                var newBirthDate;
                var newGender = $('#isMaleGenderSelect').val();
                UserController.editUser(user.objectId, oldPass, newUserName, newEmail, avatarFile, newCity, newBirthDate, newGender);
            } catch (ex) {
                notyInCustomContainer($('#userProfileSection'), 'bottomCenter', 'warning', ex.message, 3);
            }

        }
    }
    
    function removeUserProfileView() {
        var existingUserProfileContainer = $('#userProfileSection');
        if (existingUserProfileContainer.length !== 0) {
            existingUserProfileContainer.remove();
        }
    }
    
    function showAndHideLoginLogoutRegisterIfUserIsLogged(isLogged, id, name) {
        var navUl = $('body header nav ul');
        var registerLi = $('#registerLi');
        var loginLi = $('#loginLi');
        var logoutLi = $('#logoutLi');
        var userProfileLi = $('#userProfileLi');
        
        if (isLogged) {
            
            if (loginLi.length !== 0) {
                loginLi.remove();
            }
            
            if (registerLi.length !== 0) {
                registerLi.remove();
            }
            
            if (logoutLi.length === 0) {
                logoutLi = $('<li>').attr('id', 'logoutLi').insertBefore(navUl.children().first());
            }
            
            $('<a>')
            .attr('href', "#/logout/")
            .text('Logout')
            .attr('id', 'logoutAtag')
            .appendTo(logoutLi);
            
            if (userProfileLi.length === 0) {
                userProfileLi = $('<li>').attr('id', 'userProfileLi').insertBefore(navUl.children().last());
            }
            
            $('<a>')
            .attr('href', "#/user/" + id)
            .text(name + "' profile")
            .attr('id', 'userProfile')
            .appendTo(userProfileLi);

        } else {
            if (logoutLi.length !== 0) {
                logoutLi.remove();
            }
            
            if (userProfileLi.length !== 0) {
                userProfileLi.remove();
            }
            
            if (loginLi.length === 0) {
                loginLi = $('<li>').attr('id', 'loginLi').insertBefore(navUl.children().last());
            }
            
            $('<a>')
            .attr('href', "#/login/")
            .text('Login')
            .attr('id', 'loginAtag')
            .appendTo(loginLi);
            
            if (registerLi.length === 0) {
                registerLi = $('<li>').attr('id', 'registerLi').insertBefore(navUl.children().last());
            }
            
            $('<a>')
            .attr('href', "#/register/")
            .text('Register')
            .attr('id', 'registerAtag')
            .css('display', 'inline-block')
            .appendTo(registerLi);
        }


    }
    
    return {
        registerView: registerView,
        removeRegisterView: removeRegisterView,
        loginView: loginView,
        logoutView: logoutView,
        removeLoginView: removeLoginView,
        userProfileView: userProfileView,
        removeUserProfileView: removeUserProfileView,
        showAndHideLoginLogoutRegisterIfUserIsLogged: showAndHideLoginLogoutRegisterIfUserIsLogged
    }
}());


