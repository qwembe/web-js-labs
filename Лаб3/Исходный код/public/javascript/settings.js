"use strict";$.ajax({url:"/dataset",success:function(t){var e=JSON.parse(t);$(document).ready(function(){$("#set").prepend($('<p id="pause">Pause: '+e.pause+"</p>)")),$("#set").prepend($('<p id="interval">Interval: '+e.interval+"</p>)")),$("#set").prepend($('<p id="timeout">Timeout: '+e.timeout+"</p>)")),$("#set").prepend($('<p id="time">Time: '+e.time+"</p>)")),$("#set").prepend($('<p id="date">Date: '+e.date+"</p>)")),$("#date").after($('<input type="date" id="date2" name="date" >test')),$("#time").after($('<input type="time" id="time2" name="time" >test')),$("#timeout").after($('<input type="text" id="timeout2" name="timeout" >test')),$("#interval").after($('<input type="text" id="interval2" name="interval" >test')),$("#pause").after($('<input type="text" id="pause2" name="pause" >test')),$("#pause2").after($('<button type="submit" name="submit" id="btn"> submit </button>  ')),$("#btn").on("click",function(){""!=$("#date2").val()&&$.ajax({type:"PUT",url:"/settings/",data:{date:$("#date2").val()},success:function(){$("#date").text("Date: "+$("#date2").val())}}),""!=$("#time2").val()&&$.ajax({type:"PUT",url:"/settings/",data:{time:$("#time2").val()},success:function(){$("#time").text("Time: "+$("#time2").val())}}),""!=$("#timeout2").val()&&$.ajax({type:"PUT",url:"/settings/",data:{timeout:$("#timeout2").val()},success:function(){$("#timeout").text("Timeout: "+$("#timeout2").val())}}),""!=$("#interval2").val()&&$.ajax({type:"PUT",url:"/settings/",data:{interval:$("#interval2").val()},success:function(){$("#interval").text("Interval: "+$("#interval2").val())}}),""!=$("#pause2").val()&&$.ajax({type:"PUT",url:"/settings/",data:{pause:$("#pause2").val()},success:function(){$("#pause").text("Pause: "+$("#pause2").val())}})})})}});