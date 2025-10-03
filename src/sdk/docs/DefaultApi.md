# DefaultApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**emailDomainRestrictionInfoEmailDomainRestrictionInfoGet**](#emaildomainrestrictioninfoemaildomainrestrictioninfoget) | **GET** /email/domain_restriction_info | Email Domain Restriction Info|
|[**emailSendVerificationCodeEmailSendVerificationCodePost**](#emailsendverificationcodeemailsendverificationcodepost) | **POST** /email/send_verification_code | Email Send Verification Code|
|[**loginAccountLoginPost**](#loginaccountloginpost) | **POST** /account/login | Login|
|[**myInfoAccountMeInfoGet**](#myinfoaccountmeinfoget) | **GET** /account/me/info | My Info|
|[**registerAccountAccountRegisterPost**](#registeraccountaccountregisterpost) | **POST** /account/register | Register Account|

# **emailDomainRestrictionInfoEmailDomainRestrictionInfoGet**
> EmailDomainRestrictionInfo emailDomainRestrictionInfoEmailDomainRestrictionInfoGet()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.emailDomainRestrictionInfoEmailDomainRestrictionInfoGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**EmailDomainRestrictionInfo**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **emailSendVerificationCodeEmailSendVerificationCodePost**
> any emailSendVerificationCodeEmailSendVerificationCodePost(bodyEmailSendVerificationCodeEmailSendVerificationCodePost)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    BodyEmailSendVerificationCodeEmailSendVerificationCodePost
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let bodyEmailSendVerificationCodeEmailSendVerificationCodePost: BodyEmailSendVerificationCodeEmailSendVerificationCodePost; //

const { status, data } = await apiInstance.emailSendVerificationCodeEmailSendVerificationCodePost(
    bodyEmailSendVerificationCodeEmailSendVerificationCodePost
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bodyEmailSendVerificationCodeEmailSendVerificationCodePost** | **BodyEmailSendVerificationCodeEmailSendVerificationCodePost**|  | |


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**400** | 请求被拒绝 |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **loginAccountLoginPost**
> Token loginAccountLoginPost()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let username: string; // (default to undefined)
let password: string; // (default to undefined)
let grantType: string; // (optional) (default to undefined)
let scope: string; // (optional) (default to '')
let clientId: string; // (optional) (default to undefined)
let clientSecret: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.loginAccountLoginPost(
    username,
    password,
    grantType,
    scope,
    clientId,
    clientSecret
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **username** | [**string**] |  | defaults to undefined|
| **password** | [**string**] |  | defaults to undefined|
| **grantType** | [**string**] |  | (optional) defaults to undefined|
| **scope** | [**string**] |  | (optional) defaults to ''|
| **clientId** | [**string**] |  | (optional) defaults to undefined|
| **clientSecret** | [**string**] |  | (optional) defaults to undefined|


### Return type

**Token**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **myInfoAccountMeInfoGet**
> AccountInfo myInfoAccountMeInfoGet()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.myInfoAccountMeInfoGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**AccountInfo**

### Authorization

[OAuth2PasswordBearer](../README.md#OAuth2PasswordBearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **registerAccountAccountRegisterPost**
> any registerAccountAccountRegisterPost(bodyRegisterAccountAccountRegisterPost)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    BodyRegisterAccountAccountRegisterPost
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let bodyRegisterAccountAccountRegisterPost: BodyRegisterAccountAccountRegisterPost; //

const { status, data } = await apiInstance.registerAccountAccountRegisterPost(
    bodyRegisterAccountAccountRegisterPost
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **bodyRegisterAccountAccountRegisterPost** | **BodyRegisterAccountAccountRegisterPost**|  | |


### Return type

**any**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful Response |  -  |
|**400** | 请求被拒绝 |  -  |
|**422** | Validation Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

