import { Bucket } from 'aws-cdk-lib/aws-s3';
import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
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
  }
}
