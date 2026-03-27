import { Cors, LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib/core';
import { PATH_METADATA_ENABLE_CONTEXT } from 'aws-cdk-lib/cx-api';
import { Construct } from 'constructs';
import * as path from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsSandboxStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsSandboxQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const testBucket = new Bucket(this, 'testing-bucket', {
      versioned: true,
      bucketName: "testing-bucket-23129382929abc"
    })

    const helloLambda = new NodejsFunction(this, 'helloLambda', {
      entry: path.join(__dirname, "../src/backend/hello.ts"),
      runtime: Runtime.NODEJS_20_X
    })

    const api = new RestApi(this, 'MyRestApi', {
      restApiName: 'My service',
      description: 'testing api gateway',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS
      }
    })

    const pingEndpoint = api.root.addResource('ping')
    pingEndpoint.addMethod('GET', new LambdaIntegration(helloLambda))

  }
}
