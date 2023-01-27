import { Controller, Get } from "@nestjs/common/decorators";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("ping/version")
@Controller()
export class Echo {
  @Get("/ping") get() {
    return "pong";
  }
  @Get("/version") getVersion() {
    return `v${process.env.npm_package_version}`;
  }
}
