import Serverless from "serverless";
import { FuncService } from "../../services/funcService";

export class AzureFuncPlugin {
  public hooks: { [eventName: string]: Promise<any> };
  public commands: any;
  private service: FuncService;


  public constructor(private serverless: Serverless, private options: Serverless.Options) {
    this.hooks = {
      "func:func": this.func.bind(this),
      "func:add:add": this.add.bind(this),
      "func:remove:remove": this.remove.bind(this)
    };

    this.commands = {
      func: {
        usage: "Add or remove functions",
        lifecycleEvents: [
          "func",
        ],
        commands: {
          add: {
            usage: "Add azure function",
            lifecycleEvents: [
              "add",
            ],
            options: {
              name: {
                usage: "Name of function to add",
                shortcut: "n",
              }
            }
          },
          remove: {
            usage: "Remove azure function",
            lifecycleEvents: [
              "remove",
            ],
            options: {
              name: {
                usage: "Name of function to remove",
                shortcut: "n",
              }
            }
          }
        }
      }
    }

    this.service = new FuncService(serverless, options);
  }

  private async func() {
    this.serverless.cli.log("Use the func plugin to add or remove functions within Function App");
  }

  private async add() {
    this.service.add();
  }

  private async remove() {
    this.service.remove();
  }
}