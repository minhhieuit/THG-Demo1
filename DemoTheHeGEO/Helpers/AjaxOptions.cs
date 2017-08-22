using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc.Ajax;

namespace DemoTheHeGEO.Helpers
{
    public class CtAjaxOptions:AjaxOptions
    {
        public CtAjaxOptions()
        {
            OnFailure = "ajax.options.failure";
            OnSuccess = "ajax.options.success";
            LoadingElementId = "ajax-loading";
        }

        public CtAjaxOptions SetConfirm(string confirm)
        {
            this.Confirm = confirm;
            return this;
        }
        public CtAjaxOptions SetHttpMethod(string method)
        {
            this.HttpMethod = method;
            return this;
        }
        public CtAjaxOptions SetTargetId(string targetId)
        {
            this.UpdateTargetId = targetId;
            return this;
        }
        public CtAjaxOptions SetInsertionMode(InsertionMode mode)
        {
            this.InsertionMode = mode;
            return this;
        }



        public static CtAjaxOptions ForGetForm
        {
            get
            {
                return new CtAjaxOptions();
            }
        }

        public static CtAjaxOptions ForGetStep
        {
            get
            {
                return new CtAjaxOptions();
            }
        }

        public static CtAjaxOptions ForSearch
        {
            get
            {
                return new CtAjaxOptions();
            }
        }

        public static CtAjaxOptions ForDelete
        {
            get
            {
                return new CtAjaxOptions
                {
                    Confirm = "Chắc không?"
                };
            }
        }

        public static CtAjaxOptions ForCreateForm
        {
            get
            {
                return new CtAjaxOptions();
            }
        }

        public static CtAjaxOptions ForUpdateForm
        {
            get
            {
                return new CtAjaxOptions();
            }
        }

        public static CtAjaxOptions ForGetDetails
        {
            get
            {
                return new CtAjaxOptions();
            }
        }
    }
}