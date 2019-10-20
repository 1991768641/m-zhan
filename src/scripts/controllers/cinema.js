import cinemaView from './../views/cinema.art'
import cinemanavView from './../views/cinema-nav.art';
const cinemaModel = require('./../models/cinemas');
import indexController from './index';
const Bscroll = require('better-scroll');

class Cinema {

    constructor() {
        this.list = []
        this.num = 0
        this.cityid=1
    }

    renderer(list) {
        let cinemanavhtml = cinemanavView({
            list
        })
        $('.cinema-list-warp').html(cinemanavhtml);
        $('.city-entry').on('tap',function(){
            let citys=$(this).attr('data-city');
            location.hash=`${citys}`;
        })
        let cityname=window.localStorage.getItem('city');
        $('.city-entry .city').html(cityname);

        $('.search-entry').on('tap', function () {
            location.hash = 'search';
            window.localStorage.setItem('type','2');
        });

    }

    async render() {
        indexController.render();

        

        let that = this;
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let time = year + '-' + month + '-' + day;
        let cityid=this.cityid=window.localStorage.getItem('cityid');

        let result = await cinemaModel.get({
            date:time,
            offsets:this.num,
            cityid:cityid||1
        });
        
        let html = cinemaView({});
        $('main').html(html);
        
        let list =this.list= result.cinemas;
        this.renderer(list);

        let bScroll = new Bscroll.default($('.cinema-list-box').get(0), {
            probeType: 2
        });

        bScroll.on('scrollEnd', async function () {
            if (this.maxScrollY > this.y) {
                that.num = that.num + 20;

                let result = await cinemaModel.get({
                    date: time,
                    offsets: that.num,
                    cityid:cityid||1
                });

                let list = result.cinemas;
                that.list = [...that.list, ...list];
                that.renderer(that.list);
            }
        });

        $('head title').html('影院');
        $('header').html('影院');
        that.num = 0;
    }
}

export default new Cinema();