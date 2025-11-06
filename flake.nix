{
  description = "nix-develop and code away";

  inputs.nixpkgs = {
    url = "https://flakehub.com/f/NixOS/nixpkgs/0.2505.809711";
  };

  outputs =
    inputs:
    let
      supportedSystems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forEachSupportedSystem =
        f:
        inputs.nixpkgs.lib.genAttrs supportedSystems (
          system:
          f {
            pkgs = import inputs.nixpkgs {
              inherit system;
              overlays = [ inputs.self.overlays.default ];
            };
          }
        );
    in
    {
      overlays.default = final: prev: rec {
        nodejs = prev.nodejs;
      };

      devShells = forEachSupportedSystem (
        { pkgs }:
        {
          default = pkgs.mkShell {
            packages = with pkgs; [
              # Add NodeJS Dependencies
              node2nix
              nodejs_24

              # Add Build & DevEnv Dependencies
              #docker # Ensure that docker.service is running on your OS
              #docker-compose
              #docker-buildx
              cowsay
              lolcat

            ];
            GREETING = "CS5610 Environment Activated!";

            shellHook = ''
              echo "Installing NPM Dependencies" | cowsay | lolcat && sleep 1 && npm install .
              echo "Starting the Dev Server" | cowsay | lolcat && sleep 1 && npm run start
            '';
          };
        }
      );
    };
}
