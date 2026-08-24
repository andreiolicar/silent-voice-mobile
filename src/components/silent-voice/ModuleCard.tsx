import {
  Battery,
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  X,
  type LucideIcon,
} from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

import { colors, fontFamilies, radii, spacing } from '@/theme';

import { AppText } from '../ui/AppText';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SuccessIndicator } from './SuccessIndicator';

type ModuleCardProps = {
  battery?: number;
  icon: LucideIcon;
  iconSize?: number;
  name: string;
  requirement: 'required' | 'optional';
  rssi?: number | null;
  state: 'connected' | 'disconnected';
};

export function ModuleCard({
  battery,
  icon: Icon,
  iconSize = 24,
  name,
  requirement,
  rssi,
  state,
}: ModuleCardProps) {
  const isConnected = state === 'connected';
  const stateColor = isConnected ? colors.success : colors.textSecondary;
  const stateLabel = isConnected ? 'Conectado' : 'Desconectado';
  const metadata =
    battery === undefined && rssi === undefined
      ? null
      : `RSSI ${rssi ?? '-'} dBm • ${battery ?? 0}%`;
  const BatteryIcon =
    battery === undefined || battery === 0
      ? Battery
      : battery >= 80
        ? BatteryFull
        : battery >= 40
          ? BatteryMedium
          : BatteryLow;

  return (
    <Card accessibilityLabel={`${name}, ${stateLabel}`} style={styles.card}>
      <View style={styles.iconOutline}>
        <View style={styles.icon}>
          <Icon color={stateColor} size={iconSize} />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.headline}>
          <AppText style={styles.name}>{name}</AppText>
          <Badge
            size="compact"
            style={
              requirement === 'required'
                ? styles.requiredBadge
                : styles.optionalBadge
            }
            tone={requirement === 'required' ? 'success' : 'neutral'}
          >
            {requirement === 'required' ? 'Obrigatório' : 'Opcional'}
          </Badge>
        </View>
        <View style={styles.state}>
          <View style={[styles.stateDot, { backgroundColor: stateColor }]} />
          <AppText style={[styles.stateText, { color: stateColor }]}>
            {stateLabel}
          </AppText>
        </View>
        {metadata ? (
          <View style={styles.metadata}>
            <AppText style={styles.metadataText} tone="secondary">
              {metadata}
            </AppText>
            <BatteryIcon color={stateColor} size={12} />
          </View>
        ) : null}
      </View>
      {isConnected ? (
        <SuccessIndicator size={20} />
      ) : (
        <View style={styles.disconnectedIndicator}>
          <X color={colors.white} size={10} strokeWidth={3} />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.md,
  },
  iconOutline: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.background,
    borderRadius: radii.full,
  },
  icon: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.full,
    backgroundColor: colors.background,
  },
  content: { flex: 1, alignItems: 'flex-start', gap: spacing.xs },
  headline: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  name: {
    flexShrink: 1,
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    lineHeight: 15,
  },
  requiredBadge: { backgroundColor: 'rgba(26, 169, 155, 0.3)' },
  optionalBadge: { backgroundColor: 'rgba(146, 156, 173, 0.3)' },
  state: { flexDirection: 'row', alignItems: 'center', gap: spacing.xxs },
  stateDot: { width: 4, height: 4, borderRadius: radii.full },
  stateText: {
    fontFamily: fontFamilies.medium,
    fontSize: 9,
    lineHeight: 10,
  },
  metadata: { flexDirection: 'row', alignItems: 'center', gap: spacing.xxs },
  metadataText: {
    fontFamily: fontFamilies.medium,
    fontSize: 9,
    lineHeight: 10,
  },
  disconnectedIndicator: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.full,
    backgroundColor: colors.textSecondary,
  },
});
