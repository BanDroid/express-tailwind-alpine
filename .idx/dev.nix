# To learn more about how to use Nix to configure your environment
# see: https://firebase.google.com/docs/studio/customize-workspace
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_22
    pkgs.nodePackages.pnpm
    # pkgs.nodePackages.nodemon
  ];
  # Sets environment variables in the workspace
  env = {};
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      # "vscodevim.vim"
      "denoland.vscode-deno"
      "usernamehw.errorlens"
      "dbcode.dbcode"
      "pkief.material-icon-theme"
      "rangav.vscode-thunder-client"
      "esbenp.prettier-vscode"
    ];
    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          # Example: run "npm run dev" with PORT set to IDX's defined port for previews,
          # and show it in IDX's web preview panel
          command = ["deno" "task" "'dev*'"];
          manager = "web";
          env = {
            # Environment variables to set for your server
            PORT = "3000";
          };
        };
      };
    };
    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        # npm-install = "npm install";
        # Open editors for the following files by default, if they exist:
        default.openFiles = [ "src/app.ts" "README.md" ];
        create-user-home-bin = ''
          mkdir $HOME/.local
          mkdir $HOME/.local/bin
        '';
        download-deno = "curl -fsSL https://deno.land/install.sh | sh";
        deno-install = "deno install --npm --allow-scripts"
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "npm run watch-backend";
        # dev-server = "deno task 'dev*'"
      };
    };
  };
}