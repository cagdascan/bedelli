Session.setDefault('sessionSignUpForm',true);


Template.signupForm.rendered = function() {
    $('.datetimepicker3').datetimepicker({
      language: 'tr',
      pickTime: false,
      useCurrent: false,
      showToday: true,
      defaultDate:"",
    });
};



Template.signupForm.events({
  'click .kaydolButon': function(event, template) {
    event.preventDefault();
    var kullanici_emaili = template.find("#signup-email").value;
    var sifre = template.find("#signup-password").value;
    var isim = template.find("#signup-name").value;
    var dogum = template.find("#signup-birthdate").value;
    var soyad = template.find("#signup-surname").value;
    //kontrol
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re2 = /^\w+$/;
    var re3 = /[0-9]/;
    var re4 = /[a-z]/;
    var re5 = /[A-Z]/;
    if(!re.test(kullanici_emaili)){
      $('.kullanicihatasi').html("Geçerli bir email adresi giriniz.");
    }
    else if(sifre== ""){
      $('.kullanicihatasi').html("Şifre kısmı boş kalamaz.");
    }
    else if(!re2.test(sifre)){
      $('.kullanicihatasi').html("Şifrede sadece harfler ve sayılar olmalı.");
    }
    else if(sifre.length < 6){
      $('.kullanicihatasi').html("Şifre 6 karakterden uzun olmalı.");
    }
    else if(!re3.test(sifre)) {
      $('.kullanicihatasi').html("Şifrede en az bir sayı bulunmalı.");
    }
    else if(!re4.test(sifre)){
      $('.kullanicihatasi').html("Şifrede en az bir küçük harf bulunmalı.");
    }    
    else if(!re5.test(sifre)){
      $('.kullanicihatasi').html("Şifrede en az bir büyük harf bulunmalı.");
    }
    else if(isim ==""){
       $('.kullanicihatasi').html("İsim kısmı boş bırakılamaz.");
    }
    else if(soyad ==""){
       $('.kullanicihatasi').html("Soyad kısmı boş bırakılamaz.");
    }
    else if(dogum ==""){
       $('.kullanicihatasi').html("Doğum tarihi kısmı boş bırakılamaz.");
    }
    else {
    Accounts.createUser({
      username: kullanici_emaili,
      password: sifre,
      profile: {
        name: isim,
        birthday: dogum,
        surname: soyad
        
        // Other required field values can go here
      }
      
    }, function(error) {
      if (error) {
        $('.kullanicihatasi').html("Bu kullanıcı ismi kullanılıyor (e-mail).");
        console.log(error.reason)
      }
    });
  }
  },

   "click .btn-Facebook": function () {
        event.preventDefault();
        console.log('log loginWithFacebook');
        Meteor.loginWithFacebook({
            requestPermissions: ['user_birthday', 'email'],
            requestOfflineToken: true
        }, function (err) {
            if(err) {
                console.log('loginWithFacebook error');
            } else {
              console.log('hata yok');
            }
        });
    },

    "click .giris":function(){
      var kullanciAdi = $("#signin-email").val();
      var girisSifre = $("#signin-password").val();
      
      Meteor.loginWithPassword(kullanciAdi, girisSifre, function(error, result) {
      if (error) {
        $('.kullanicihatasi').html("Kullanıcı adı veya şifre yanlış");
        console.log(error.reason);
      } else {
        console.log("oldu bu is");
      }
    });
    },

    'click .uyeGirisi':function(){
      Session.set('sessionSignUpForm',false);
      return Session.get('sessionSignUpForm');

    },
    'click .uyeOl':function(){
      Session.set('sessionSignUpForm',true);
      return Session.get('sessionSignUpForm');
    }
});


Template.signupForm.helpers({
  'sessionSignUpForm':function(){
    return Session.get('sessionSignUpForm');
  }
});