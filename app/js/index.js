$(function () {
    let tianqi;
    $.ajax({
        type:"get",
        url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
        dataType:"jsonp",
        success:function (obj) {
            tianqi=obj.data;
            console.log(tianqi);
            updata(tianqi);
        }
    })

    function updata(tianqi) {
        //获取当前城市天气
        $(".main-center>span").html(tianqi.city);
        $(".main-text-top>p:nth-child(1)").html(tianqi.weather.current_temperature);
        $(".main-text > p").html(tianqi.weather.current_condition);
        $(".main-left > p:nth-child(2)").html(tianqi.weather.quality_level);
        $(".center-left-bottom > span:nth-child(1)").html(tianqi.weather.current_condition);
        $(".center-right-bottom > span:nth-child(1)").html(tianqi.weather.tomorrow_condition);
        $(".center-right-top> span:nth-child(2)>i:nth-child(1)").html(tianqi.weather.tomorrow_high_temperature);
        $(".center-right-top> span:nth-child(2)>i:nth-child(2)").html(tianqi.weather.tomorrow_low_temperature+"℃");
        $(".center-left-top> span:nth-child(2)>i:nth-child(1)").html(tianqi.weather.dat_high_temperature);
        $(".center-left-top> span:nth-child(2)>i:nth-child(2)").html(tianqi.weather.dat_low_temperature+"℃");
        //未来24小时天气
        let hweather =tianqi.weather.hourly_forecast;
        hweather.forEach(function (v) {
            let str=`
            <div class="weather-one">
                 <span>${v.hour}:00</span>
                 <span><img src="./img/${v.weather_icon_id}.png" alt=""></span>
                 <span>${v.temperature}°</span>
             </div>`
            $(".weather>div.container").append(str);
        })
        let dweather = tianqi.weather.forecast_list;
        for(let i=0; i<dweather.length-10;i++){
            let str=`<div class="other-one-first">
                       <span>${dweather[i].date}</span>
                       <span></span>
                   </div>`
            $(".other-one").append(str);
            let str1=`
             <div class="other-two-first">
                      <span>${dweather[i].condition}</span>
                      <img src="./img/${dweather[i].weather_icon_id}.png" alt="">
                  </div>`
            $(".other-two").append(str1);
            let str2=`
            <div class="other-ones-first">
                      <span>${dweather[i].wind_direction}</span>
                      <span>${dweather[i].wind_level+"级"}</span>
                  </div>`
            $(".other-ones").append(str2);

        }

    }
    let city;
    $.ajax ({
        type:"get",
        url:"https://www.toutiao.com/stream/widget/local_weather/city/",
        dataType:"jsonp",
        success:function (obj) {
            city=obj.data;
            console.log(city);
            updataCity(city);
        }
    })
    //获取城市信息
    function updataCity(city) {
        for (let i in city) {
            let str=`<h5>${i}</h5>`;
            $(".viewlist>ul").append(str);
            for(let j in city[i]){
                // console.log(j);
                let str=`<li>${j}`;
                $(".viewlist>ul").append(str);
            }
        }
    }

    window.onload=function () {
        $(".search>img").click(function () {
            let texts=$("input").val();
            let flag;
            for (let i in city) {
                for(let j in city[i]){
                    console.log(j);
                   if (texts==j){
                       flag=true;
                   }
                }
            }
            if(flag!=true){
                alert("输入格式错误")
                return false;
            }
            ajaxs(texts);
            $(".select").css("display","none");
            $(".dingwei>p").html(texts);


        })

        $(".viewlist>ul>li").click(function () {
            // $(".weather>div.container").css("display","none");
                let con=$(this).html();
                $(".select").css("display","none");
                $(".other-two-first").css("display","none");
                $(".weather-one").css("display","none");
                $(".other-one-first").css("display","none");
                $(".other-ones-first").css("display","none");
                $(".dingwei>p").html(con);
                let str3=`
                     <div class="history-bottom">
                     
           <span>${con}</span>

       </div>
                `;
                $(".twos").append(str3);
            $(".history>img").click(function () {
                $(".history-bottom").remove();
            })

                ajaxs(con);
        })
        function ajaxs(con) {
            $.ajax({
                        type:"get",
                        url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+con+"",
                        dataType:"jsonp",
                        success:function (obj) {
                            tianqi=obj.data;
                            // console.log(city);
                            updata(tianqi);
                        }
                    })
        }
    }

});