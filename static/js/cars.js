    var model = {
        carList: [],
        page: 0,
        pageLen: 6
    };

    var $cars = $('#cars');
    var $pages = $('#pages');
    var $modal = $('#modal');

    function checkModalState() {
        var windowWidth = $(window).width();
	    if(windowWidth > 767)
	    	$("div.sw").attr("id","myModal");
	    	else
	    	$("div.sw").attr("id","w");
    }

    function init() {
        $.getJSON('/static/cars.json')
            .done(function (data) {
                model.carList = data;
                render();
            })
            .fail(function () {
                alert('Error loading JSON');
            });
    }

    function renderCars(data, shift, $parent) {
        var html = '<div class="row">';
        $.each(data, function (index, car) {
            html +=
            '<div class="col-sm-6 col-md-4 rotatePic">' +
                '<div class="visible-xs-block dd"><h4>'+
                    car.title +
                  '</h4></div>'+
                '<figure class="car">' +
                    '<a href="#car-' + (index + shift + 1) + '" data-index="' + (index + shift) + '">' +
                        '<img src="static/images/' + car.picture + '" alt="' + car.title + '" data-longdesc="' + car.description +'" data-toggle="modal" data-target="#myModal">' +
                        '</a>' +
                '</figure>' +
                '<div class="visible-xs-block">'+
                    car.description +
                  '</div>'+
            '</div>';

        });
        html += '</div>';

        $parent.html(html);
        $parent.find('a').click(function (event) {
            var index = +$(this).attr('data-index')%model.pageLen;

            renderModal(data, index, $modal)
            checkModalState()
            });
            return ;
        }
    function renderModal(cars, carIndex, $parent){
          var html =
              '<div id="myModal" class="modal fade sw" role="dialog">'+
              '<div class="modal-dialog modal-lg">'+
                        '<!-- Modal content-->'+
                        '<div class="modal-content desc">'+
                          '<div class="modal-header">'+
                            '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                            '<h4 class="modal-title">'+cars[carIndex].title + '</h4>'+
                          '</div>'+
                          '<div class="modal-body">'+
                            '<img class="preview" src="static/images/' + cars[carIndex].picture + '">'+
                            '<p class="description">'+cars[carIndex].description + '</p>'+
                          '</div>'+
                          '<div class="modal-footer">'+
                            '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
                          '</div>'+
                        '</div>'+
                     '</div>'+
              '</div>';
        $parent.html(html);
    }


    function renderPages(current, count, $parent) {
        // outer HTML
        var html = '<ul class="pagination">';
        var classAttr;

        // previous
        classAttr = (current === 0) ? ' class="disabled"' : '';
        // nextPage =  (current === 0) ? current+1 : current

        html +=
            '<li' + classAttr + '>' +
                '<a href="#page-' + current + '" data-page="' + (current - 1) + '">&laquo;</a>' +
            '</li>';

        // pages list
        for (var i = 0; i < count; ++i) {
            classAttr = (i === current) ? ' class="active"' : '';
            html +=
                '<li' + classAttr + '>' +
                    '<a href="#page-' + (i + 1) + '" data-page="' + i + '">' + (i + 1) + '</a>' +
                '</li>';
        }

        // next
        classAttr = (current >=  count - 1) ? ' class="disabled"' : '';
        html +=
            '<li' + classAttr + '>' +
                '<a href="#page-' + (current + 2) + '" data-page="' + (current + 1) + '">&raquo;</a>' +
            '</li>';

        if(current >=  count - 1){}
        // end of outer HTML
        html += '</ul>';

        $parent.html(html);
        $parent.find('a').click(function (event) {

            var index = +$(this).attr('data-page');
            if((index<0)||(index >= count)){
                event.preventDefault()
            }
            paginate(index,count);

            return ;
        });
    }

    function render() {
        var page = model.page;
        var step = model.pageLen;
        var pageCount = Math.ceil(model.carList.length / step);

        renderCars(model.carList.slice(page * step, (page + 1) * step), page * step, $cars);
        renderPages(page, pageCount, $pages);
    }

    function paginate(index, libLen) {
        model.page = index;
        if ((index >=0) && (index < libLen)){
            render();
        }
    }

    // start application
    $(document).ready(init);



