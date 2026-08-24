import {
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react-native';
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native';

import { colors, fontFamilies, radii, webNoOutline } from '@/theme';

import { AppText } from '../ui/AppText';
import { Card } from '../ui/Card';
import { SuccessIndicator } from './SuccessIndicator';

type DeviceCardProps = {
  battery?: number;
  icon?: LucideIcon;
  imageSource?: ImageSourcePropType;
  name: string;
  onPress?: () => void;
  rssi?: number;
  status?: string;
  variant?: 'silentVoice' | 'external';
};

export function DeviceCard({
  battery,
  icon: Icon,
  imageSource,
  name,
  onPress,
  rssi,
  status,
  variant = 'external',
}: DeviceCardProps) {
  const isSilentVoice = variant === 'silentVoice';
  const isInteractive = isSilentVoice && Boolean(onPress);
  const BatteryIcon =
    battery === undefined
      ? null
      : battery >= 66
        ? BatteryFull
        : battery >= 40
          ? BatteryMedium
          : BatteryLow;
  const metadata = [
    rssi === undefined ? null : `RSSI ${rssi} dBm`,
    battery === undefined ? null : `${battery}%`,
  ].filter(Boolean);

  return (
    <Pressable
      accessibilityLabel={[name, status].filter(Boolean).join(', ')}
      accessibilityRole={isInteractive ? 'button' : undefined}
      disabled={!isInteractive}
      onPress={isInteractive ? onPress : undefined}
      style={[styles.pressable, webNoOutline]}
    >
      <Card
        style={[
          styles.card,
          isSilentVoice ? styles.silentVoice : styles.external,
        ]}
      >
        <View style={styles.icon}>
          {imageSource ? (
            <Image
              resizeMode="contain"
              source={imageSource}
              style={styles.deviceImage}
            />
          ) : Icon ? (
            <Icon color={colors.textSecondary} size={24} strokeWidth={1.5} />
          ) : null}
        </View>
        <View style={styles.content}>
          <AppText style={styles.name}>{name}</AppText>
          {status ? (
            <View style={styles.status}>
              {isSilentVoice ? <View style={styles.statusDot} /> : null}
              <AppText
                style={styles.statusText}
                tone={isSilentVoice ? 'accent' : 'secondary'}
              >
                {status}
              </AppText>
            </View>
          ) : null}
          {metadata.length ? (
            <View style={styles.metadata}>
              <AppText style={styles.metadataText} tone="secondary">
                {metadata.join(' • ')}
              </AppText>
              {BatteryIcon ? (
                <BatteryIcon color={colors.textSecondary} size={12} />
              ) : null}
            </View>
          ) : null}
        </View>
        <View style={styles.action}>
          {isSilentVoice ? (
            <SuccessIndicator size={20} />
          ) : (
            <ChevronRight color={colors.textSecondary} size={16} />
          )}
        </View>
      </Card>
    </Pressable>
  );
}

const silentVoiceGlow =
  Platform.select<ViewStyle>({
    web: { boxShadow: '0 0 6px rgba(26, 169, 155, 0.25)' },
    default: {
      shadowColor: colors.accent,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 2,
    },
  }) ?? {};

const styles = StyleSheet.create({
  pressable: { borderRadius: radii.card },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
    borderWidth: 0.8,
  },
  silentVoice: {
    height: 72,
    minHeight: 72,
    borderColor: colors.accent,
    ...silentVoiceGlow,
  },
  external: { height: 68, minHeight: 68, borderColor: 'transparent' },
  icon: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.full,
    backgroundColor: colors.background,
    overflow: 'hidden',
  },
  deviceImage: { width: 44, height: 44 },
  content: { flex: 1, alignItems: 'flex-start', gap: 5 },
  name: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    lineHeight: 15,
  },
  status: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statusDot: {
    width: 4,
    height: 4,
    borderRadius: radii.full,
    backgroundColor: colors.accent,
  },
  statusText: {
    fontFamily: fontFamilies.medium,
    fontSize: 9,
    lineHeight: 10,
  },
  metadata: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metadataText: {
    fontFamily: fontFamilies.medium,
    fontSize: 9,
    lineHeight: 10,
  },
  action: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
