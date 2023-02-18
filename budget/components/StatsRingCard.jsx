import { createStyles, Text, Card, RingProgress, Group } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
  },

  inner: {
    display: "flex",

    [theme.fn.smallerThan(350)]: {
      flexDirection: "column",
    },
  },

  ring: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",

    [theme.fn.smallerThan(350)]: {
      justifyContent: "center",
      marginTop: theme.spacing.md,
    },
  },
}));

export function StatsRingCard({ goal, totalCost, totalTime, monthly, ROI }) {
  const { classes, theme } = useStyles();

  return (
    <Card withBorder p="xl" radius="md" className={classes.card}>
      <div className={classes.inner}>
        <div>
          <Text size="xl" className={classes.label}>
            {goal}
          </Text>
          <div>
            <Text className={classes.lead} mt={30}>
              {totalCost}
            </Text>
            <Text size="xs" color="dimmed">
              Total Cost
            </Text>
          </div>
          <Group mt="lg">
            <div>
              <Text className={classes.label}>{monthly}</Text>
              <Text size="xs" color="dimmed">
                Deposit
              </Text>
            </div>
            <div>
              <Text className={classes.label}>{ROI}</Text>
              <Text size="xs" color="dimmed">
                Interest
              </Text>
            </div>
            <div>
              <Text className={classes.label}>{totalTime}</Text>
              <Text size="xs" color="dimmed">
                Time period in yrs
              </Text>
            </div>
          </Group>
        </div>

        <div className={classes.ring}></div>
      </div>
    </Card>
  );
}
