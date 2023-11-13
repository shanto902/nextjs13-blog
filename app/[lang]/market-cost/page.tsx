import BazarDor from "@/components/bazarDor/BazarDor";
import PaddingContainer from "@/components/layout/PaddingContainer";
import directus from "@/lib/directus";
import { BazaarDor } from "@/types/collection";
import React from "react";

const MarketCost = async ({
  params,
}: {
  params: {
    lang: string;
  };
}) => {
  const locale = params.lang;

  const getBazarDor = async () => {
    try {
      const bazarDor = await directus.items("bazar_dor").readByQuery({
        fields: ["*", "translations.*"],
      });

      if (locale === "en") {
        return bazarDor?.data || [];
      } else {
        const localizedBazarDor = bazarDor.data?.map((bazar: BazaarDor) => {
          return {
            ...bazar,
            title: bazar?.translations[0]?.title,
            description: bazar?.translations[0]?.description,
          };
        });

        return localizedBazarDor || [];
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching BazarDor");
    }
  };

  const latestBazarDor: BazaarDor[] = (await getBazarDor()).reverse();
  return (
    <div className="">
      <PaddingContainer>
        <BazarDor locale={locale} bazarDor={latestBazarDor} />
      </PaddingContainer>
    </div>
  );
};

export default MarketCost;
