<%@ page import="org.apache.axis2.context.ConfigurationContext" %>
<%@ page import="org.wso2.carbon.context.CarbonContext" %>
<%@ page import="org.wso2.carbon.registry.api.Registry" %>
<%@ page import="org.wso2.carbon.context.RegistryType" %>
<%@ page import="org.wso2.carbon.registry.api.Resource" %>
<%
CarbonContext cCtx = CarbonContext.getCurrentContext();
Registry registry = cCtx.getRegistry(RegistryType.SYSTEM_CONFIGURATION);
String registryType = RegistryType.SYSTEM_GOVERNANCE.toString();
if(registryType != null) {
registry = cCtx.getRegistry(RegistryType.valueOf(registryType));
}

Resource resource = registry.newResource();
resource.setContent("value to be add");
String resourcePath = "/_system/local/";
registry.put(resourcePath, resource);

%>