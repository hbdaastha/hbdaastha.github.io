//! annyang
//! version : 0.2.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://www.TalAter.com/annyang/
(function(){"use strict";var a=this,b=a.webkitSpeechRecognition||a.mozSpeechRecognition||a.msSpeechRecognition||a.oSpeechRecognition||a.SpeechRecognition;if(!b)return a.annyang=null,null;var c,d,e,f="en-US",g={start:[],error:[],end:[],result:[],resultMatch:[],resultNoMatch:[],errorNetwork:[],errorPermissionBlocked:[],errorPermissionDenied:[]},h=0,i=!1,j="font-weight: bold; color: #00f;",k=/\s*\((.*?)\)\s*/g,l=/(\(\?:[^)]+\))\?/g,m=/(\(\?)?:\w+/g,n=/\*\w+/g,o=/[\-{}\[\]+?.,\\\^$|#]/g,p=function(a){return a=a.replace(o,"\\$&").replace(k,"(?:$1)?").replace(m,function(a,b){return b?a:"([^\\s]+)"}).replace(n,"(.*?)").replace(l,"\\s*$1?\\s*"),new RegExp("^"+a+"$","i")},q=function(a){for(var b=0,c=a.length;c>b;b++)a[b].callback.apply(a[b].context)};a.annyang={init:function(k){d&&d.abort&&d.abort(),d=new b,d.maxAlternatives=10,d.continuous=!0,d.lang=f,d.onstart=function(){q(g.start)},d.onerror=function(a){switch(q(g.error),a.error){case"network":q(g.errorNetwork);break;case"not-allowed":case"service-not-allowed":e=!1,(new Date).getTime()-h<200?q(g.errorPermissionBlocked):q(g.errorPermissionDenied)}},d.onend=function(){if(q(g.end),e){var b=(new Date).getTime()-h;1e3>b?setTimeout(a.annyang.start,1e3-b):a.annyang.start()}},d.onresult=function(b){q(g.result);for(var d,e=b.results[b.resultIndex],f=0;f<e.length;f++){d=e[f].transcript.trim(),i&&a.console.log("Speech recognized: %c"+d,j);for(var h=0,k=c.length;k>h;h++){var l=c[h].command.exec(d);if(l){var m=l.slice(1);return i&&(a.console.log("command matched: %c"+c[h].originalPhrase,j),m.length&&a.console.log("with parameters",m)),c[h].callback.apply(this,m),q(g.resultMatch),!0}}}return q(g.resultNoMatch),!1},c=[],this.addCommands(k)},start:function(a){a=a||{},e=void 0!==a.autoRestart?!!a.autoRestart:!0,h=(new Date).getTime(),d.start()},abort:function(){e=!1,d.abort()},debug:function(a){i=arguments.length>0?!!a:!0},setLanguage:function(a){f=a,d&&d.abort&&(d.lang=a)},addCommands:function(b){var d,e;for(var f in b)if(b.hasOwnProperty(f)){if(d=a[b[f]]||b[f],"function"!=typeof d)continue;e=p(f),c.push({command:e,callback:d,originalPhrase:f})}i&&a.console.log("Commands successfully loaded: %c"+c.length,j)},addCallback:function(b,c,d){if(void 0!==g[b]){var e=a[c]||c;"function"==typeof e&&g[b].push({callback:e,context:d||this})}}}}).call(this);