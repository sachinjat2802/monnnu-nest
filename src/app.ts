import { INestApplication } from "@nestjs/common";
//import { ValidationPipe } from "@nestjs/common/pipes";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder } from "@nestjs/swagger";
import { OpenAPIObject, SwaggerModule } from "@nestjs/swagger/dist";
import helmet from "helmet";
import { AppModule } from "./app.module";


export class App {
  private app: INestApplication;
  private document: OpenAPIObject;
  constructor(private port: number) {
    this.bootstrap();
  }
  private documentBuilder() {
    return new DocumentBuilder()
      .setTitle("node poc")
      .setDescription(
        "nest js api with documention and swagger " +
          process.env.npm_package_version
      )
      .setVersion(process.env.npm_package_version)
      .addTag("nest js api")
      .build();
  }
  private async bootstrap() {
    this.app = await NestFactory.create(AppModule, {
      cors: true,
      logger: ["error", "warn", "debug",'log'],
      bodyParser: true,
       rawBody:true
    });
    this.initializeMiddelware();

    this.document = SwaggerModule.createDocument(
      this.app,
      this.documentBuilder()
    );
    SwaggerModule.setup("api", this.app, this.document);

    await this.app.listen(this.port);
    this.getUrl();


}
public async getUrl() {
  console.log(`Server is running on url ${await this.app.getUrl()}`);

}
  private async initializeMiddelware() {
    this.app.use(helmet());
    this.app.setGlobalPrefix("api/v1");
    //this.app.useGlobalPipes(new ValidationPipe())

  }
}
