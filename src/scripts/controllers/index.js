const layoutView = require('../views/layout.art')
const layoutnavView=require('../views/layout-nav.art');

class Index {

    bindClick() {
        location.hash=$(this).attr('data-to');
    }
    
    render() {
        const html = layoutView({});
        const nav = layoutnavView({});
        
        var cityname = window.localStorage.getItem('city');
        var cityid = window.localStorage.getItem('cityid');

        if (!cityname) {
            window.localStorage.setItem('city', '北京');
            cityname = window.localStorage.getItem('city');
        }
        if (!cityid) {
            window.localStorage.setItem('cityid', '1');
            cityid = window.localStorage.getItem('cityid');
        }

        $('.navlist').html(nav);
        $('#root').html(html);

        $('footer li').on('tap', this.bindClick);
    }
}
export default new Index();