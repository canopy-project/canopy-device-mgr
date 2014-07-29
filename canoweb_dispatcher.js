/*
 * Copyright 2014 Gregory Prisament
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function CanowebDispatcher(canopy) {
    var self=this;
    self.currentPageNode = null;

    this.switchTo = function(nextPageNode) {
        if (self.currentPageNode != null) {
            self.currentPageNode.get$().fadeOut('fast', function() {
                self.currentPageNode = nextPageNode;
                self.currentPageNode.render($("#main"));
                self.currentPageNode.get$().fadeIn('fast');
            });
        }
        else {
            self.currentPageNode = nextPageNode;
            self.currentPageNode.render($("#main"));
            self.currentPageNode.get$().show();
        }
    }

    this.showPage = function(pageName) {
        if (pageName == "login") {
            this.switchTo(new CanoLoginPageNode(canopy, self));
        }
        else if (pageName == "main") {
            this.switchTo(new CanoMainPageNode({
                canopyClient: canopy, 
                dispatcher: self
            }));
        }
    }
}
