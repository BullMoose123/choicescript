/*
 * Copyright 2010 by Dan Fabulich.
 * 
 * Dan Fabulich licenses this file to you under the
 * ChoiceScript License, Version 1.0 (the "License"); you may
 * not use this file except in compliance with the License. 
 * You may obtain a copy of the License at
 * 
 *  http://www.choiceofgames.com/LICENSE-1.0.txt
 * 
 * See the License for the specific language governing
 * permissions and limitations under the License.
 * 
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied.
 */
dojo.provide("choicescript.tests.autotesttest");

var fixture = choicescript.tests.autotesttest;

fixture.nav = {
  nextSceneName: function() { return "";}
}

load(path + "../editor/embeddable-autotester.js");

//if (doh.registerUrl) {
//    var loaderHtml = dojo.moduleUrl("choicescript.tests", "loader.html");
//    doh.registerUrl(loaderHtml);
//}

function debughelp() {
    debugger;
}

doh.registerGroup("choicescript.tests.Basic", [
        function textOnly() {
            stats = {};
            nav = fixture.nav;
            var scene = "foo\nbar\nbaz";
            var result = autotester(scene);
            doh.is(toJson([1,1,1,0]), toJson(result[0]), "coverage");
            var uncovered = result[1];
            doh.f(uncovered);
        }
        ,function unreachable() {
          stats = {};
          nav = fixture.nav;
          var scene = "foo\n*goto baz\nbar\n*label baz\nbaz";
          var result = autotester(scene);
          doh.is(toJson([1,1,0,1,1,0]), toJson(result[0]), "coverage");
          var uncovered = result[1];
          doh.is(uncovered.length, 1);
          doh.is(uncovered[0], 3);
        }
        ,function badElseIf() {
          stats = {};
          nav = fixture.nav;
          var scene = ""
            +"\n*temp blah"
            +"\n*set blah 2"
            +"\n*if blah = 2"
            +"\n  two"
            +"\n*elseif blah = 3"
            "+\n  three";
          doh.assertError(Error, null, "autotester", scene, "Fall out of if statement");
        }
    ]
);



/*
doh.register("choicescript.tests.ExpressionParsing", [
        { name: "My Function Test [_myfunc()]", 
            timeout: 4000, 
            runTest: function(){ 
                this.scene = new Scene("test", {});
                doh.assertEqual("test", this.scene.name); 
            } 
        } 
    ]
); 
*/