var user_name;
var pass_word;
var github;
var user;
var gist_list;
var select_option;
var current_gist;
var gist;


var body = document.getElementsByTagName('body')[0];
var input_username = document.createElement('input');
input_username.type= 'text';
input_username.placeholder = 'username';
body.appendChild(input_username);
var input_password = document.createElement('input');
input_password.type= 'password';
input_password.placeholder = 'password';
body.appendChild(input_password);

var submit_login = document.createElement('button');
submit_login.type = 'submit';
submit_login.innerHTML = 'Submit';
body.appendChild(submit_login);

var select_gist = document.createElement('select');
body.appendChild(select_gist);

var submit_select_gists = document.createElement('button');
submit_select_gists.type = 'submit';
submit_select_gists.innerHTML = 'GIST';
body.appendChild(submit_select_gists);

var select_gist_files = document.createElement('select');
body.appendChild(select_gist_files);

var submit_gist_files = document.createElement('button');
submit_gist_files.type = 'submit';
submit_gist_files.innerHTML = 'FILE';
body.appendChild(submit_gist_files);

var gist_content = document.createElement('div');
body.appendChild(gist_content);



submit_login.addEventListener('click',function(){
    if (user_name != undefined){return;}
   user_name = input_username.value;
   pass_word = input_password.value;


    github = new Github({
        username: user_name,
        password: pass_word,
        auth: "basic"
    });

    user = github.getUser();
    user.userGists(user_name,function(err,res){
        gist_list = res;

        //var temp_obj={};
        //
        //for (var i=0;i<gist_list.length;i++){
        //    temp_obj[i] = gist_list[i];
        //}

        var i=0;
        for (obj in gist_list){


            select_option = document.createElement('option');
            select_option.value = String(i);
            select_option.innerHTML =gist_list[i].description;
            if (select_option.innerHTML===''||null){select_option.innerHTML = 'no description'}
            select_gist.appendChild(select_option);
            i+=1;
        }
    })

});

submit_select_gists.addEventListener('click',function(){
    select_gist_files.innerHTML= '';
    var gist_id = gist_list[select_gist.value].id;
    gist = github.getGist(gist_id);

    gist.read(function(err,res){
        current_gist = res;
        var gist_files = current_gist.files;
        var i=0;

        for (obj in gist_files){

            select_option = document.createElement('option');
            select_option.value = String(i);

            select_option.innerHTML = obj;
            select_gist_files.appendChild(select_option);
            i+=1;
        };


    });

});

submit_gist_files.addEventListener('click',function(){
    var gist_file_keys= Object.keys(current_gist.files);
      gist_content.innerHTML=  current_gist.files[gist_file_keys[select_gist_files.value]].content;
});