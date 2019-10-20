import profileView from './../views/profile.art';
import indexController from './index';

class Profile{

    render(){
        indexController.render();
        let html=profileView({});
        $('main').html(html);
        $('head title').html('我的');
        $('header').html('我的');
    }
}

export default new Profile();