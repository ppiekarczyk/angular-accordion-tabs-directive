(function () {
    angular.module('angular-accordion-tabs-directive', [])
    .directive('angularAccordionTabs', [function () {

        var viewport = angular.element(window),
        navItems = [];

        function Tab (container, transformWidth, activeClsName) {
            this.container = container;
            this.transformWidth = transformWidth;
            this.activeClsName = activeClsName;

            this.tabs = angular.element('.tab-section', '.tab-container');
            this.currentActiveTab = 0;

            this.checkViewport();
            this.bindEvents();
        };

        Tab.prototype = {

            checkViewport: function () {
                if (window.innerWidth < this.transformWidth) {
                    this.navItems = angular.element('.tab-header', '.tab-container');
                } else {
                    this.navItems = angular.element('.nav-item', this.element);
                }
            },

            bindEvents: function () {
                var _this = this;

                _this.navItems.each(function (index) {
                    var navItem = angular.element(this);

                    navItem.on('click', function (e) {
                        e.preventDefault();

                        if (_this.currentActiveTab !== index) {
                            _this.currentActiveTab = index;
                            _this.closeAll();
                            _this.open();
                        }
                    });
                });
            },

            open: function () {

                $(this.navItems[this.currentActiveTab]).addClass(this.activeClsName);
                $(this.tabs[this.currentActiveTab]).addClass(this.activeClsName);

            },

            close: function () {

                $(this.navItems[this.currentActiveTab]).removeClass(this.activeClsName);
                $(this.tabs[this.currentActiveTab]).removeClass(this.activeClsName);

            },

            closeAll: function () {

               this.navItems.removeClass(this.activeClsName);
               this.tabs.removeClass(this.activeClsName);

           }
       }

       return {
        restrict: 'A',
        link: function (scope, element, attrs) {

            var transformWidth = attrs.transform,
            activeClsName = attrs.activeclsname;

            new Tab(element, transformWidth, activeClsName);

        }
    }
}]);
}());