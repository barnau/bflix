var User = require('./models/user');

var mongoose = require('./config/connection');

  var admin = User({
      username: 'admin',
      password: 'password',
      fullAccess: true
  });

  admin.save((err) => {
    if(err) {
      console.log(err);
    } else {
      console.log('user saved')
    }
  })


  // User.findOne({username: adminUser.username}, (err, user) => {
  //   if(err) {
  //       adminUser.save((err) => {
  //           if(err) {
  //               console.log('failed to create user. ' + err)
  //           } else {
  //               console.log('Created user.')
  //           }
  //       })
  //   } else {
  //     console.log('User already exists: ' + user)
  //   }
  // })

//   User.findOne({username: 'blainearnau@gmail.com'}, (err, user) => {

//     if(!err) {
//         console.log(user.username)
//         user.fullAccess = false;
//         user.save();
//         console.log(user.fullAccess)
//     } else {
//         console.log(err)
//     }
//   });

  // var users = User.find({}, (err, users) => {
  //     console.log(' ')
  //     console.log('Here are all users..')

  //     if(err) {
  //       console.log('No users found')
  //       return;
  //     }

  //     users.forEach((user) => {
  //       console.log('username:' + user.username);
  //       console.log('full access:' + user.fullAccess);
  //       console.log('   ');
  //       if(user.username !== adminUser.username && !user.fullAccess === undefined) {
  //           user.fullAccess = false;
  //           user.save((err) => {
  //               if(!err) {
  //                   console.log('Updated full access off for ' + user.username);
  //               }
  //           })
  //       }
  //       })
  // });


