import { InputCompressionType } from 'aws-cdk-lib/aws-dynamodb'
import { SamlConsolePrincipal } from 'aws-cdk-lib/aws-iam'
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'

export const handler = async (
    event: APIGatewayProxyEvent,
    context: Context
): Promise<APIGatewayProxyResult> => {
    console.log('event received in function')

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "hello testing function",
            input: event.body,
        })
    }
}