import { Bluetooth, Headphones, Link, RefreshCcw } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Image, Platform, StyleSheet, View } from 'react-native';

import { DeviceCard, PrivacyNotice } from '@/components/silent-voice';
import { AppText, Button, Card, IconButton } from '@/components/ui';
import {
  BrandLogo,
  InitialFlowScreen,
} from '@/features/initial-flow/components';
import { colors, fontFamilies } from '@/theme';

type ConnectionState = 'scanning' | 'selected' | 'connecting' | 'connected';

const neckband = require('@/assets/images/initial-flow/connection-neckband.png');
const neckbandThumbnail = require('@/assets/images/initial-flow/connection-neckband-thumbnail.png');
const radar = require('@/assets/images/initial-flow/connection-radar.png');
const POST_CONNECTION_ROUTE = '/home' as const;

export default function Connection() {
  const router = useRouter();
  const [state, setState] = useState<ConnectionState>('scanning');
  const scanTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startScan = () => {
    if (scanTimer.current) clearTimeout(scanTimer.current);
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    setState('scanning');
    scanTimer.current = setTimeout(() => setState('selected'), 900);
  };

  useEffect(() => {
    scanTimer.current = setTimeout(() => setState('selected'), 900);
    return () => {
      if (scanTimer.current) clearTimeout(scanTimer.current);
      if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    };
  }, []);

  const connect = () => {
    if (state !== 'selected') return;
    setState('connecting');
    feedbackTimer.current = setTimeout(() => {
      setState('connected');
      feedbackTimer.current = setTimeout(
        () => router.replace(POST_CONNECTION_ROUTE),
        600,
      );
    }, 850);
  };

  const devicesVisible = state !== 'scanning';
  const selected = devicesVisible && state !== 'connected';

  return (
    <InitialFlowScreen background={null} contentStyle={styles.content}>
      <BrandLogo style={styles.logo} />

      <View style={styles.header}>
        <View style={styles.headingCopy}>
          <AppText style={styles.title} variant="screenTitle">
            Conectar{`\n`}dispositivo
          </AppText>
          <AppText style={styles.subtitle} tone="secondary">
            Buscando módulos próximos{`\n`}para iniciar o pareamento.
          </AppText>
        </View>
        <Image resizeMode="contain" source={neckband} style={styles.neckband} />
      </View>

      <Card style={styles.searchCard}>
        <View style={styles.radarFrame}>
          <Image source={radar} style={styles.radar} />
        </View>
        <View style={styles.searchCopy}>
          <AppText style={styles.searchTitle}>Buscando dispositivos...</AppText>
          <AppText style={styles.searchDescription} tone="secondary">
            Mantenha o dispositivo ligado{`\n`}e por perto.
          </AppText>
        </View>
      </Card>

      <View style={styles.devicesSection}>
        <View style={styles.devicesHeadline}>
          <AppText style={styles.sectionLabel} tone="secondary">
            DISPOSITIVOS ENCONTRADOS
          </AppText>
          <IconButton
            accessibilityLabel="Atualizar dispositivos encontrados"
            icon={RefreshCcw}
            iconSize={12}
            onPress={startScan}
            size="compact"
            variant="refresh"
          />
        </View>

        <View style={styles.devices}>
          {devicesVisible ? (
            <>
              <DeviceCard
                battery={67}
                imageSource={neckbandThumbnail}
                name="Silent Voice Neckband"
                onPress={() => setState('selected')}
                rssi={-72}
                status="Pronto para conectar"
                variant="silentVoice"
              />
              <DeviceCard
                battery={67}
                icon={Headphones}
                name="AirPods Pro"
                rssi={-72}
                variant="external"
              />
              <DeviceCard
                battery={32}
                icon={Bluetooth}
                name="Dispositivo desconhecido"
                rssi={-85}
                variant="external"
              />
            </>
          ) : (
            <View style={styles.scanningPlaceholder}>
              <AppText style={styles.scanningText} tone="secondary">
                Procurando dispositivos próximos...
              </AppText>
            </View>
          )}
        </View>
      </View>

      <View style={styles.spacer} />
      <View style={styles.footer}>
        <View style={styles.buttons}>
          <Button
            contentStyle={styles.buttonContent}
            disabled={!selected}
            iconSize={14}
            label={state === 'connected' ? 'Conectado' : 'Conectar'}
            labelStyle={styles.buttonLabel}
            leftIcon={Link}
            loading={state === 'connecting'}
            onPress={connect}
            style={styles.button}
          />
          <Button
            contentStyle={styles.buttonContent}
            foregroundColor={colors.accent}
            iconSize={14}
            label="Tentar novamente"
            labelStyle={styles.retryLabel}
            leftIcon={RefreshCcw}
            onPress={startScan}
            style={styles.button}
            variant="ghost"
          />
        </View>
        <PrivacyNotice
          compact
          text="Seus dados são protegidos e não são compartilhados."
        />
      </View>
    </InitialFlowScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: Platform.select({ web: 75, default: 18 }),
    paddingBottom: 30,
  },
  logo: { alignSelf: 'center', marginBottom: 35 },
  header: {
    position: 'relative',
    height: 112,
    justifyContent: 'center',
  },
  headingCopy: { gap: 10 },
  title: {
    fontSize: 26,
    lineHeight: 28,
    letterSpacing: -0.4,
  },
  subtitle: {
    fontFamily: fontFamilies.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  neckband: {
    position: 'absolute',
    top: -26,
    right: -33,
    width: 194,
    height: 184,
  },
  searchCard: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 35,
    padding: 12,
  },
  radarFrame: { width: 55, height: 55 },
  radar: { position: 'absolute', left: -5, width: 60, height: 55 },
  searchCopy: { gap: 5 },
  searchTitle: {
    fontFamily: fontFamilies.semiBold,
    fontSize: 12,
    lineHeight: 15,
  },
  searchDescription: {
    fontFamily: fontFamilies.medium,
    fontSize: 9,
    lineHeight: 10,
  },
  devicesSection: { marginTop: 26 },
  devicesHeadline: {
    height: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    fontFamily: fontFamilies.medium,
    fontSize: 8,
    lineHeight: 10,
    letterSpacing: 1,
  },
  devices: { gap: 12, marginTop: 12 },
  scanningPlaceholder: {
    height: 228,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanningText: {
    fontFamily: fontFamilies.medium,
    fontSize: 9,
    lineHeight: 10,
  },
  spacer: { flexGrow: 1, minHeight: 20 },
  footer: { gap: 12 },
  buttons: { gap: 8 },
  button: { minHeight: 42, height: 42 },
  buttonContent: { gap: 10 },
  buttonLabel: { fontSize: 12, lineHeight: 22 },
  retryLabel: { color: colors.accent, fontSize: 12, lineHeight: 22 },
});
