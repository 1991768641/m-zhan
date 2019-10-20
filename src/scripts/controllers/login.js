import loginView from './../views/login.art';
import indexController from './index';

class Login{
    render(){
        indexController.render();
        let html=loginView({});
        $('#root').html(html);
    }
}
export default new Login();