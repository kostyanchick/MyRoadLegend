 var model = {
        sliderList: [],
        image: 0
    };

var $slider = $('#myCarousel');
var handled=false;//global variable

function checkSliderState() {
    var windowWidth = $(window).width();
    if(windowWidth > 767) {
        $("div.caption").attr("style", "visibility: visible;");
        }
        else{
            $("div.caption").attr("style","visibility: hidden;");
        }
}

function init() {
//        alert('init');
        $.getJSON('/static/cars.json')
            .done(function (data) {
                model.sliderList = data;
                render();
            })
            .fail(function () {
                alert('Error loading JSON');
            });
}

function render() {
    imageCount = model.sliderList.length;
    renderSlider(model.sliderList, model.image, imageCount, $slider);
     checkSliderState();
}

function renderSlider(data, imageIndex, count, $parent) {

      var html = '<ol class="carousel-indicators carousel-indicators-numbers hidden-xs">';
//            <!-- Indicators -->
        for (var i = 0; i < count; ++i) {
            classAttr = (i === imageIndex) ? 'active' : '';
            html +=
               '<li class="' + classAttr + '" data-target="#myCarousel" data-slide-to="'+ i + '"></li>';
        }
        html += '</ol>';

        html +=
            '<div class="carousel-inner" role="listbox">';
//        '<!-- Wrapper for slides -->'
        for (var i = 0; i < count; ++i) {
            classAttr = (i === imageIndex) ? 'active' : '';
            html +=
                '<div class="item ' + classAttr + '" style="background-image: url(static/images/' + data[i].picture + ');">'+
//                '<div class="item ' + classAttr + '">'+
//                    '<img src="static/images/' + data[i].picture + '" alt="' + data[i].title + '">'+
                    '<div class="caption carousel-caption hidden-xs">'+
                        '<h3>'+ data[i].title +'</h3>'+
                        '<p>'+ data[i].description +'</p>'+
                    '</div>'+
                '</div>';
        }
        html += '</div>';
//        <!-- Left and right controls -->

        html +=
              '<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">'+
                '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
                '<span class="sr-only">Previous</span>'+
              '</a>'+
              '<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">'+
                '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
                '<span class="sr-only">Next</span>'+
              '</a>';

        $parent.html(html);

        $slider.carousel();

        $slider.bind('slide.bs.carousel', function (e) {
            var current=$(e.target).find('.item.active');
            var indx=$(current).index();
            if((indx+2)>$('.carousel-indicators li').length)
                indx=-1;
             if(!handled)
             {
                $('.carousel-indicators li').removeClass('active')
                $('.carousel-indicators li:nth-child('+(indx+2)+')').addClass('active');
             }
             else
             {
                handled=!handled;//if handled=true make it back to false to work normally.
             }
        });

        $(".carousel-indicators li").on('click',function(){
           //Click event for indicators
           $(this).addClass('active').siblings().removeClass('active');
           //remove siblings active class and add it to current clicked item
           handled=true; //set global variable to true to identify whether indicator changing was handled or not.
        });

//        alert('finish')

}
$(document).ready(init);
