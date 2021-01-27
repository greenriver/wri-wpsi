# Add to your .ssh/config
# Host wri-prod
#   HostName 194.171.38.130
#   User amichal
#   ForwardAgent yes
server 'wri-prod', roles: %w[app db web]

set :branch, `git rev-parse --abbrev-ref HEAD`.chomp

append :linked_dirs, 'storage'
