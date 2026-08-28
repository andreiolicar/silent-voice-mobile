import { BatteryFull } from 'lucide-react-native';
import { Image, StyleSheet, View } from 'react-native';

import { StatusBadge } from '@/components/silent-voice';
import { AppText, Card } from '@/components/ui';
import { colors, radii, spacing } from '@/theme';

const neckbandThumbnail = require('@/assets/images/initial-flow/connection-neckband-thumbnail.png');

type HubDeviceCardProps = {
  battery: number;
  connected: boolean;
  name: string;
};

export function HubDeviceCard({
  battery,
  connected,
  name,
}: HubDeviceCardProps) {
  return (
    <Card
      accessibilityLabel={`${name}. ${connected ? 'Conectado' : 'Desconectado'}. ${battery}% de bateria.`}
      style={styles.card}
    >
      <View style={styles.iconFrame}>
        <Image
          resizeMode="contain"
          source={neckbandThumbnail}
          style={styles.deviceImage}
        />
      </View>
      <View style={styles.copy}>
        <AppText variant="cardTitle">{name}</AppText>
        <StatusBadge
          label={connected ? 'Conectado' : 'Desconectado'}
          size="compact"
          tone={connected ? 'success' : 'neutral'}
        />
      </View>
      <View style={styles.battery}>
        <BatteryFull color={colors.accent} size={18} />
        <AppText tone="secondary" variant="supporting">
          {battery}%
        </AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 82,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconFrame: {
    width: 48,
    height: 48,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.full,
    backgroundColor: colors.background,
  },
  deviceImage: { width: 44, height: 44 },
  copy: { minWidth: 0, flex: 1, gap: spacing.xs },
  battery: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
});
