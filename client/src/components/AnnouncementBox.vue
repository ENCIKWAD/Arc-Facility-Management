<template>
    <v-card height="450" rounded="l" class="mb-6">
        <v-card-title>{{ announcement.title }}</v-card-title>
        <p  class="ml-4 mb-3 bold-text">publish at: {{ announcement.date }}</p>
        <v-divider></v-divider>
        <v-card-text>Well-developed and documented policies and strategies are the best practice form of controls in information security (IS) (Rhodes-Ousley, 2013, p. 58). Given the significance of IS for healthcare (Landi, 2015), the implementation of these practices appears to be a must for it.

A strategy is a “complete plan for defense, detection, and deterrence” that includes all the relevant elements in it; policy is a description of “management intent for information protection” (Rhodes-Ousley, 2013, pp. 20, 58). There is no unified classification for the phenomena, but some general features allow researchers and practitioners to group IS policies and strategies into types. For instance, Ahmad, Maynard, and Park (2012) discuss the preventive strategy (PS) type that is primarily aimed at preventing any attack, disclosure, or breach. The authors point out that the use of PS is explained by the specifics of the organization: preventive measures are designed for particularly vulnerable industries.PS employs a variety of elements in its IS plan. For instance, the use of multiple technological safeguards, which are required by HIPAA (Murray, Calhoun, & Philipsen, 2011), is a form of technological PS measures. In particular, the employment of encryption is a viable strategy (Landi, 2015). Also, vulnerability checking, monitoring, and maintenance are important for PS (Ahmad et al., 2012). Finally, Ahmad et al. (2012) mention certain policies, especially the clean desk policy, that can promote PS. This policy implies that enforcement measures are also to be introduced into PS, including compliance-ensuring measures (both carrot and stick ones) and training (Chen, Ramamurthy, & Wen, 2012).

Thus, PS can be aligned with current legislation as well as the company’s specifics and security-related objectives. Apart from that, PS does add value to stakeholders’ well-being. Here, the inclusion of extensive employee training in the strategy is illustrative because it is of benefit to employees as well as other stakeholders (Landi, 2015). Indeed, training makes sure that employees are capable of protecting the data, which improves security and also helps employees to avoid doing harm unintentionally.

The key point of PS consists of directing multiple efforts at ensuring that security breaches do not occur, which applies to healthcare organizations due to their vulnerability and the simultaneous need for the protection of sensitive information. The mechanisms and elements of PS are multiple, but training, which is included in PS, is also a major vehicle which ensures that the policy and strategy are understood and assimilated.</v-card-text>
    </v-card>
</template>

<script>
export default{
    name: "AnnouncementBox",
    props: {
        announcement: Object
    }
}

</script>

<style scoped>
.bold-text {
    font-weight: bold;
}
</style>