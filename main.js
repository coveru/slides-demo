let $buttons = $('#buttons>button')
let $slides = $('#slides')
let $images = $slides.children('img')
let current = 0


makeFakeSlides()


$slides.css({ transform: 'translateX(- 450px)'})
bindEvents()
$('#next').on('click',function(){
    goToSlide(current+1)
})
$('#previous').on('click',function(){
    goToSlide(current-1)
})

let timer = setInterval (()=>{
    goToSlide(current+1)
},2000)


$('.container').on('mouseenter',function(){
  window.clearInterval(timer)
})

$('.container').on('mouseleave',function(){
    timer = setInterval (()=>{
        goToSlide(current+1)
    },2000)
  })
 
  
  
  











  // 下面可以不看
function bindEvents() {  
  $('#buttons').on('click','button',function(e){
    let  $button = $(e.currentTarget)
    let  index = $button.index()
    //activeButton($button)
    goToSlide(index)    
  })
}

 function goToSlide(index){
     if(index>$buttons.length-1){
         index = 0
     }else if(index<0){
         index = $buttons.length - 1
     }
    if(current === $buttons.length - 1 && index === 0){ //最后一张到第一张
        $slides.css({ transform: `translateX(${-($buttons.length + 1)*450}px)`})
                .one('transitionend', function () {
                    $slides.hide()
                        .offset()
                    $slides.css({ transform: `translateX(${-(index+1)*450}px)` })
                        .show()
                })          
    }else if(current === 0 && index === $buttons.length -1){   //第一张到最后一张
        $slides.css({ transform: `translateX(0px)`})
        .one('transitionend', function () {
            $slides.hide()
                .offset()
            $slides.css({ transform: `translateX(${-(index+1)*450}px)` })
                .show()
            })
    }else{
    $slides.css({ transform: `translateX(${- (index+1) * 450}px)`})
    }
    current = index
   // $buttons.eq(current).trigger('click')  //此处有bug？？未解决
 }

function makeFakeSlides() {
    let $firstCopy = $images.eq(0).clone(true)
    let $lasttCopy = $images.eq($images.length - 1).clone(true)

    $slides.append($firstCopy)
    $slides.prepend($lasttCopy)
}

/*function activeButton($button) {
    $button
      .addClass('red')
      .siblings('.red').removeClass('red')
  }*/