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


/**
 * @추천상품 -> 1
 * @신상품 -> 2
 * 
 * @frame -> 뿌려질 영역
 * @sortNum -> 분류데이터 넘버
 */
    function dataLoad(frame,sortNum){
    fetch('./assets/data/productData.json')
    .then((response) => response.json())
    .then((json) => {

      data = json.items
      var result = data.filter(function(a){return a.sort == sortNum });
        
        let html = '';

        result.forEach(element => {
          

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
              </li>`;

        });

        $(frame).html(html);
    });
  }

  dataLoad('#recommList1',1)
  dataLoad('#newList1',2)
  dataLoad('#hourList1',3)
  dataLoad('#wishList1',4)
  dataLoad('#weekList1',5)


  /**
   * 
   * @param {*} num 
   * @returns 
   */
  
    function number(num){ 
      return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * 
     * @a ->정상가 
     * @b ->할인가 
     *
     */
    function salePercent(a,b){
     return Math.floor(((a-b)/a)*100);
    }



    // 공통 슬라이드
    var shopSlide = new Swiper(".shop .swiper", {
        slidesPerView: 'auto',
        spaceBetween: 10,
      });

    //  새로 슬라이드
    var verticalSlide = new Swiper(".sc-realtime .swiper", {
        direction:"vertical",
        loop:true,
         autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
      });

    //   배너 슬라이드

    var swiperBanner = new Swiper(".sc-banner .swiper", {
         
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

    function dataDeal(frame,sortNum){
      fetch('./assets/data/dealData.json')
      .then((response) => response.json())
      .then((json) => {
  
        data = json.items
        var result = data.filter(function(a){return a.sort == sortNum });
          
          let htmlDeal = '';
  
          deliveryEl = `<span class="free">무료배송</span>`
          departEl = `  <em>백화점</em>`
          pickEl = `<em class="pic">PICK-UP@</em>`
  
          result.forEach(element => {
  
          optDepart = (element.snippets.option.depart)? departEl:'';
          optPickup = (element.snippets.option.pickup)? pickEl:'';
          freedelivery = (element.snippets.freedelivery)? deliveryEl:'';
  
            htmlDeal+=`<li class="swiper-slide">
                        <a href="">
                            <div class="img-wrap"><img src="${element.snippets.thumbnail}" alt=""></div>
                            <div class="txt-box">
                               ${optDepart}
                                ${optPickup}
                                <span class="title">${element.snippets.brand}</span>
                                <span class="info">${element.snippets.title}</span>
                                <div class="price">
                                    <span class="dc">${salePercent(element.snippets.price.og,element.snippets.price.curr)}%</span>
                                    <span class="cost"><b>${number(element.snippets.price.curr)}</b>원</span>
                                    <span class="og">${number(element.snippets.price.og)}</span>
                                </div>
                               ${freedelivery}
                            </div>
                        </a>
                    </li>`
          });
  
          $(frame).html(htmlDeal);
      })
    }
    dataDeal('#dealList1',6)
  
    /**
     * 
     * @param {*} num 
     * @returns 
     */
    
      function number(num){ 
        return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      }
  
      /**
       * 
       * @a ->정상가 
       * @b ->할인가 
       *
       */
      function salePercent(a,b){
       return Math.floor(((a-b)/a)*100);
      }


    // deal 슬라이드 
    var swiperDeal = new Swiper(".sc-deal .swiper", {
        pagination: {
            el: ".pagination",
            clickable: true,
          },
      });

    //   focus 슬라이드

      var swiperFocus = new Swiper(".sc-focus .swiper", {
        slidesPerView: 1.3,
        spaceBetween: 16,
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
    var swiperExhibit = new Swiper(".sc-exhibit .swiper", {
        slidesPerView: 'auto',
        spaceBetween: 10,
      });
      
      // premium slide
      var swiperPremium = new Swiper(".sc-premium .swiper", {
        slidesPerView: 1.1,
        spaceBetween: 20,
        loop: true,
        pagination: {
            el: ".pagination",
            clickable: true,
          },
      });

       // hot slide

       var swiperHot = new Swiper(".sc-hot .swiper", {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 10,
        pagination: {
            el: ".pagination",
            clickable: true,
          },
      });

      $('.sc-video .video-play').click(function(e){
        e.preventDefault();
       $(this).addClass('on');
        $('.sc-video iframe').play();
    })


    let topScroll = 100; //재할당 가능한 변수 선언문
    $(window).scroll(function(){
        curr = $(this).scrollTop();
       
        if (curr > topScroll) {
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
            $('.btn-top').removeClass('up')
        } else {
        
            $('.bottom-area .bottom-util').addClass('show')
            $('.btn-top').addClass('up')
        }
    
        lastScroll = curr;
        
    })


    // $('.bottom-area .bottom-util .menu').click(function(e){
    //     e.preventDefault();
    //     $('.bottom-area .bottom-menu').toggleClass('active');       


    // })

})