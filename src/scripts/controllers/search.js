import searchView from './../views/search.art';
import searchlistView from './../views/search-list.art';
import searchMovie from './../models/search';
import indexController from './index';

class Search {
    constructor() {
        this.list = []
        this.list1 = []
        this.cityid = 1
        this.content = ''
    }

    renderer(list, list1, moviestotal, cinemastotal) {
        let searchlisthtml = searchlistView({
            list,
            list1,
            moviestotal,
            cinemastotal
        })
        $('.search-result .result-wrapper').html(searchlisthtml);
    }

    movies(list, moviestotal) {
        let searchlisthtml = searchlistView({
            list,
            moviestotal
        })
        $('.search-result .result-wrapper').html(searchlisthtml);

        $('.result-wrapper .list .moviecell').on('tap', function () {
            let id = $(this).attr('data-id');
            location.hash = `detail/` + id;
        })
    }

    cinemasart(list1,cinemastotal){
        let searchlisthtml = searchlistView({
            list1,
            cinemastotal
        })
        $('.search-result .result-wrapper').html(searchlisthtml);
    }

    render() {
        let that = this;
        indexController.render();
        let html = searchView({});
        $('#root').html(html);

        $('.cancel').on('tap',function(){
            window.history.back();
        });
        $('.back').on('tap',function(){
            window.history.back();
        });

        $(".search-input").keyup(async function (ev) {
            var content = $('.search-input').val();
            $('.del-input').show();
            $('.del-input').on('click', function () {
                $('.search-input').val("");

                $('.del-input').hide();
                $('.search-result').hide();
            });
            if (content != '') {
                
                if (ev.keyCode == 13) {
                    let cityid = this.cityid = window.localStorage.getItem('cityid');
                    let type=window.localStorage.getItem('type');
                    let result = await searchMovie.get({
                        content: content,
                        cityid: cityid,
                        type:type
                    });

                    let cinemastotal,moviestotal;
                    let list1,list;

                    if(result.movies){
                        list = that.list = result.movies.list;
                        moviestotal = result.movies;
                    }else{
                        list = null;
                        moviestotal = null;
                    }

                    if (result.cinemas) {
                        list1 = that.list1 = result.cinemas.list;
                        cinemastotal = result.cinemas;
                    } else {
                        list1 = null;
                        cinemastotal = null;
                    }

                    if (cinemastotal != null&& moviestotal!=null) {
                        that.renderer(list, list1, moviestotal, cinemastotal);
                        $('.search-result').show();
                    } else if(cinemastotal != null && moviestotal==null){
                        that.cinemasart(list1,cinemastotal);
                        $('.search-result').show();
                    }else{
                        that.movies(list, moviestotal);
                        $('.search-result').show();
                    }
                }

            } else {
                $('.search-result').hide();
                $('.del-input').hide();
            }

        });



    }
}

export default new Search();