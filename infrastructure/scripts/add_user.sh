#!/bin/bash

# ==============================================================================
# Orbixa VPN - User Sync Script
# Description: Syncs a user UUID to the active Xray-core config.json.
# Usage: ./add_user.sh <NEW_UUID>
# ==============================================================================

if [ -z "$1" ]; then
  echo "Error: UUID argument missing."
  echo "Usage: ./add_user.sh 123e4567-e89b-12d3-a456-426614174000"
  exit 1
fi

NEW_UUID=$1
CONFIG_PATH="/usr/local/etc/xray/config.json"

# Check if jq is installed
if ! command -v jq &> /dev/null; then
  echo "Installing jq (JSON processor)..."
  apt install -y jq
fi

# Make a backup
cp $CONFIG_PATH "$CONFIG_PATH.bak"

echo "Adding UUID $NEW_UUID to $CONFIG_PATH..."

# Use jq to append the new user object into the clients array
jq --arg uuid "$NEW_UUID" '
  .inbounds[0].settings.clients += [
    {
      "id": $uuid
    }
  ]
' $CONFIG_PATH > /tmp/xray_temp.json

# Overwrite config
mv /tmp/xray_temp.json $CONFIG_PATH

echo "Restarting Xray-core..."
systemctl restart xray

echo "Successfully added user $NEW_UUID and restarted service."
