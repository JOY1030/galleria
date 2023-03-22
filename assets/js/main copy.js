$(function(){

    $(window).scroll(function(){

        curr=$(this).scrollTop();
        if (curr > 50) {
            $('.header .gnb-area .gnb-list , .header .gnb-area .gnb-list .gnb-item').addClass('on');
      
        } else {
            $('.header .gnb-area .gnb-list , .header .gnb-area .gnb-list .gnb-item').removeClass('on');
        }

    });

    $(window).trigger('scroll');

    $('.header .gnb-area .gnb-list .gnb-item').click(function (e) { 
        $(this).color('#f00');
        
    });

    // banner data

    fetch('./assets/data/bannerData.json')
    .then((response) => response.json())
    .then((json) => {

        data = json.items
        console.log(data);
        let html = '';
        let htmlBanner = '';
        let htmlBg = '';
        data.forEach(element => {
          html+= `<li class="swiper-slide">
                    <a href="${element.id}" class="slide">
                        <img src="${element.snippet.thumbnail}" alt="" class="front">
                        <div class="txt-box">
                            <p class="title">${element.snippet.title}</p>
                            <span class="desc">${element.snippet.desc}</span>
                        </div>
                    </a>
                </li>`;

          htmlBg+= `<li class="swiper-slide">
                        <img src="${element.snippet.thumbnail}" alt=>
                    </li>
              `;

          htmlBanner+=`<li class="pop-item">
          <a href="${element.id}" class="pop-link">
              <img src="${element.snippet.thumbnail}" alt="">
              <div class="txt-box">
                  <p class="title">${element.snippet.title}</p>
                  <span class="desc">${element.snippet.desc}</span>
              </div>
          </a>
      </li>`;

        });

        $('#bannerList1').html(html);
        $('#popBanner ul').html(htmlBanner);
        $('#bannerList2').html(htmlBg);
        
        var bannerSlide = new Swiper(".sc-slide .swiper.slide-front", {
          loop:true,
          loopedSlides: 1,
            speed: 700,
            autoplay: {
              delay: 4000,
              disableOnInteraction: false,
            },
            pagination: {
              el: ".fraction",
              type: "fraction",
            },
          });
    
        var bannerSlide2 = new Swiper(".sc-slide .swiper.slide-bg", {
          effect:"fade",
          loop:true,
          loopedSlides: 1,
          });
    
          bannerSlide.controller.control = bannerSlide2;
          bannerSlide2.controller.control = bannerSlide;
    
          $('.sc-slide .autoplay').click(function(){    
            if ($(this).hasClass('active')) {
              bannerSlide.autoplay.start();
                $(this).removeClass('active');
            } else {
              bannerSlide.autoplay.stop();
                $(this).addClass('active');
            }
        })
        $('.sc-slide .btn-more').click(function(){
          $('.sc-slide .pop-banner').addClass('show');
        });
        $('.sc-slide .btn-close').click(function(){
          $('.sc-slide .pop-banner').removeClass('show');
        });
    })




fetch('./assets/data/productData.json')
    .then((response) => response.json())
    .then((json) => {
      // <span class="cost">오쥐${number(element.snippet.price.og)}</span>
      // <span class="cost">할인율${salePercent(element.snippet.price.og,element.snippet.price.curr)}</span>

        data = json.items
        var result = data.filter(function(a){return a.sort == 1 });
        
        let html = '';

        departEl = `<span class="freedel">백화점</span>`
        pickEl = `<span class="freedel">픽업</span>`
        deliveryEl = `<span class="freedel">무료배송</span>`

        // ${freedelivery}
        // ${optPickup}
        // ${optDepart}

        result.forEach(element => {

        optDepart = (element.snippets.option.depart)?departEl:'';
        optPickup = (element.snippets.option.pickup)?pickEl:'';
        freedelivery = (element.snippets.freedelivery)?deliveryEl:'';

         html+=`<li class="swiper-slide">
         <a href="">
             <img src="${element.snippets.thumbnail}" alt="">
             <div class="txt-box">
                 <strong class="shop-title">${element.snippets.brand}</strong>
                 <p class="desc">${element.snippets.title}</p>
                 <div class="price">
                     <span class="cost">${number(element.snippets.price.curr)}</span>
                     <span>원</span> 
                     </div>
             </div>
         </a>
     </li>`
        });

        $('#recommList1').html(html);
    })


    function number(num){ 
      return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    function salePercent(a,b){
     return Math.floor(((a-b)/a)*100);
    }

    // 공통 슬라이드
    var swiper = new Swiper(".shop .swiper", {
        slidesPerView: 2.5,
        spaceBetween: 10,
        grabCursor: true,
      });

    //  새로 슬라이드
    var swiper = new Swiper(".sc-realtime .swiper", {
         effect:"fade",
         grabCursor: true,
      });

    //   배너 슬라이드

    var swiper = new Swiper(".sc-banner .swiper", {
         
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".fraction",
          type: "fraction",
        },
      });

      $('.sc-banner .autoplay').click(function(){    
        if ($(this).hasClass('active')) {
            swiper.autoplay.start();
            $(this).removeClass('active');
        } else {
            swiper.autoplay.stop();
            $(this).addClass('active');
        }
    })

    // deal 슬라이드 
    var swiper = new Swiper(".sc-deal .swiper", {
        spaceBetween:16,
        grabCursor: true,
        pagination: {
            el: ".pagination",
            clickable: true,
          },
      });

    //   focus 슬라이드

      var swiper = new Swiper(".sc-focus .swiper", {
        slidesPerView: 1.3,
        spaceBetween:16,
        grabCursor: true,
        pagination: {
            el: ".pagination",
            clickable: true,
          },

      });

    //   focus-click-event

    $('.focus-group a').click(function(e){
        e.preventDefault();
        $(this).addClass('active');       
        $(this).siblings().removeClass('active');

        target = $(this).attr('href');
        $('.focus-group a').removeClass('active');
        $(this).addClass('active');
        $(target).addClass('active').siblings().removeClass('active');

    })
  
    // 금주의 추천기획 slide
    var swiper = new Swiper(".sc-exhibit .swiper", {
        slidesPerView: 1.8,
        spaceBetween: 10,
        grabCursor: true,
      });
      
      // premium slide
      var swiper = new Swiper(".sc-premium .swiper", {
        slidesPerView: 1.1,
        spaceBetween: 20,
        grabCursor: true,
        loop: true,
        pagination: {
            el: ".pagination",
            clickable: true,
          },
      });

       // hot slide

       var swiper = new Swiper(".sc-hot .swiper", {
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 10,
        grabCursor: true,
        pagination: {
            el: ".pagination",
            clickable: true,
          },
      });


    //   $('.btn-top').click(function(e){
    //     e.preventDefault();
    //     window.scrollTo({top:0,behavior:'smooth'});

    // })
    let topScroll = 0; //재할당 가능한 변수 선언문
    $(window).scroll(function(){
        curr = $(this).scrollTop();
       
        if (curr > 100) {
            $('.btn-top').removeClass('show')
        } else {
        
            $('.btn-top').addClass('show')
        }
       
    })

    $('.btn-top').click(function(e){
        e.preventDefault();
        window.scrollTo({top:0,behavior:'smooth'});

    })
    

    let lastScroll = 0; //재할당 가능한 변수 선언문
    $(window).scroll(function(){
        curr = $(this).scrollTop();
       
        if (curr > lastScroll) {
            $('.bottom-area .bottom-util').removeClass('show')
        } else {
        
            $('.bottom-area .bottom-util').addClass('show')
        }
    
        lastScroll = curr;
        
    })


    // $('.bottom-area .bottom-util .menu').click(function(e){
    //     e.preventDefault();
    //     $('.bottom-area .bottom-menu').toggleClass('active');       


    // })

})