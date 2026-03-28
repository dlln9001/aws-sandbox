import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    // Parse the body from the API Gateway request
    const body = JSON.parse(event.body || "{}");
    
    // Prepare the item (DynamoDB is schema-less, so we can add anything)
    const item = {
      pk: Date.now().toString(), // Using timestamp as a simple ID
      createdAt: new Date().toISOString(),
      ...body // Spread the incoming JSON data into the table
    };

    // Write to DynamoDB (The Table Name comes from an Environment Variable)
    await docClient.send(new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: item,
    }));

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "Data saved successfully!", savedItem: item }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to save data", error: String(error) }),
    };
  }
};